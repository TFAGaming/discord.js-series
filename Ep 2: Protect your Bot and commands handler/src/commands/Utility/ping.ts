import { SlashCommandBuilder } from 'discord.js';
import { Module } from 'djs-modules.js';

export default new Module({
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    run: async (client, interaction, args) => {
        
        await interaction.reply({
            content: 'Pong! ' + client.ws.ping
        });

    },
});
