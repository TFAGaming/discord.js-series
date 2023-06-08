import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a guild member.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to kick.')
                .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('reason')
                .setDescription('The reason of the kick.')
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

        const member = interaction.guild?.members.cache.get(user.id);

        if (!member) {
            await interaction.reply({
                content: 'This user is not on the server!'
            });

            return;
        };

        try {
            await member.kick(reason);

            await interaction.reply({
                content: `\`✅\` <@${user.id}> has been kicked from the server!\n> ${reason}`
            });
        } catch {
            await interaction.reply({
                content: `\`❌\` Unable to kick <@${user.id}>.`
            });
        };
    }
});