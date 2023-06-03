import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    run: async (client, interaction, args) => {
        
        await interaction.reply({
            content: 'Pong!'
        });

    }
});