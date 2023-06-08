import { client } from "../..";
import { SlashCommandBuilder } from 'discord.js';

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    run: async (client, interaction) => {

        await interaction.reply({
            content: 'Pong!'
        });

    }
});