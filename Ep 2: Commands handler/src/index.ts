import {
    config
} from 'dotenv';
import { ExtendedClient } from './class/ExtendedClient';

config();

export const client = new ExtendedClient();

client.start();
client.loadCommands();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        command.run(client, interaction, interaction.options);
    } catch (err) {
        console.log(err);
    };
});