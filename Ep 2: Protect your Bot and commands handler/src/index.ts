import {
    Client,
    REST,
    Routes
} from 'discord.js';
import {
    config
} from 'dotenv';
import {
    Handler
} from 'djs-modules.js';

config();

const token = process.env.CLIENT_TOKEN ?? '';
const id = process.env.CLIENT_ID ?? '';

const client: Client = new Client({
    intents: [
        'Guilds'
    ]
});

const rest = new REST().setToken(token);

const handler = new Handler('./dist/commands/', { includesDir: true });

handler.on('moduleLoad', (md) => console.log(`Loaded new command: ${md.name}`));

const collection = handler.load();

(async () => {
    console.log('Started loading application commands...');

    await rest.put(Routes.applicationCommands(id), {
        body: handler.commands
    });

    console.log('Successfully loaded application commands.');
})();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = collection.get(interaction.commandName);

    if (!command) return;

    try {
        command.run(client, interaction, interaction.options);
    } catch (err) {
        console.error(err);
    };
});

client.login(token);
