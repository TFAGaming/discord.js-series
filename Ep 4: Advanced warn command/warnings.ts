import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Check a user\'s warnings.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to check their warnings, by default it\'s you.')
                .setRequired(false)
        ),
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || interaction.user;

        await interaction.deferReply();

        const data = await client.db.warn.findMany({
            where: {
                userId: user.id
            }
        });

        if (data.length <= 0) {
            await interaction.followUp({
                content: 'The user has no warnings.'
            });

            return;
        };

        const map = data.map((v) => `**ID**: ${v.id}, **Since**: <t:${Math.floor(Number(v.createdAt) / 1000)}:R>\n> ${v.reason} - <@${v.moderatorId}>`);

        await interaction.followUp({
            content: `${map.join('\n\n')}`
        });

    }
});