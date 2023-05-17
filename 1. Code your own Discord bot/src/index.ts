import {
    Client,
    REST,
    Routes,
    SlashCommandBuilder
} from 'discord.js';

const token = 'Your bot token';
const id = 'Your bot id';

const client: Client = new Client({
    intents: [
        'Guilds'
    ]
});

const rest = new REST().setToken(token);

(async () => {
    console.log('Started loading application commands...');

    await rest.put(Routes.applicationCommands(id), {
        body: [
            new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Replies with pong!')
        ]
    });

    console.log('Successfully loaded application commands.');
})();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({
            content: 'Pong!'
        });

        return;
    };
});

client.login(token);
