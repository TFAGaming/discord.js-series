import { Client, Collection, SlashCommandBuilder, ChatInputCommandInteraction, ContextMenuCommandInteraction, ContextMenuCommandBuilder, REST, Routes, CommandInteractionOptionResolver } from 'discord.js';
import { readdirSync } from 'node:fs';

interface CommandBuilderStructure {
    structure: SlashCommandBuilder | ContextMenuCommandBuilder,
    options?: any,
    run: (client: ExtendedClient, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction, args: Omit<CommandInteractionOptionResolver<'cached'>, "getMessage" | "getFocused">) => void
};

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandBuilderStructure> = new Collection();
    public commandsArray: CommandBuilderStructure['structure'][] = [];

    constructor() {
        super({
            intents: [
                'Guilds'
            ]
        });
    };

    public loadCommands() {
        for (const dir of readdirSync('./dist/commands/')) {
            for (const file of readdirSync('./dist/commands/' + dir + '/').filter((f) => f.endsWith('.js') || f.endsWith('.ts'))) {
                const module: CommandBuilderStructure = require('../commands/' + dir + '/' + file).default;

                this.commands.set(module.structure.name, module);
                this.commandsArray.push(module.structure);
            };
        };
    };

    public command = class implements CommandBuilderStructure {
        public structure: CommandBuilderStructure['structure'];
        public options?: any;
        public run: CommandBuilderStructure['run'];

        constructor(data: CommandBuilderStructure) {
            this.structure = data.structure;
            this.options = data.options;
            this.run = data.run;
        }
    };

    public async start() {
        await this.login(process.env.CLIENT_TOKEN);

        try {
            const rest = new REST().setToken(process.env.CLIENT_TOKEN ?? '');

            console.log('Started loading app commands...');

            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID ?? ''), {
                body: this.commandsArray
            });

            console.log('Loaded app commands.');
        } catch {
            console.log('Unable to loaded app commands.');
        };
    };
};