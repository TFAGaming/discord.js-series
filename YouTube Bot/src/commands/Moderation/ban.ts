import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a guild member.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('reason')
                .setDescription('The reason of the ban.')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason was provided';

        if (!user) {
            await interaction.reply({
                content: 'Invalid user provided!'
            });

            return;
        };

        if (!interaction.guild?.members.cache.get(user.id)) {
            await interaction.reply({
                content: 'This user is not on the server!'
            });

            return;
        };

        try {
            await interaction.guild.members.ban(user.id, { reason: reason });

            await interaction.reply({
                content: `\`✅\` <@${user.id}> has been banned from the server!\n> ${reason}`
            });
        } catch {
            await interaction.reply({
                content: `\`❌\` Unable to ban <@${user.id}>.`
            });
        };
    }
});