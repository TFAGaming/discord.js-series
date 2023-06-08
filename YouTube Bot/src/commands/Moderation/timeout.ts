import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { client } from "../..";
import { toMs, fromMs } from 'ms-typescript';

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Mute a guild member.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to mute.')
                .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('duration')
                .setDescription('The duration of the mute. (use s, m, d, w... etc.)')
                .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('reason')
                .setDescription('The reason of the mute.')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason was provided';
        const time = toMs(interaction.options.getString('duration') ?? '0');

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

        if (time <= 0 || time > 2419200000) {
            await interaction.reply({
                content: 'The time must be between **1 second** and **28 days**.'
            });

            return;
        };

        try {
            await member.timeout(time, reason);

            await interaction.reply({
                content: `\`✅\` <@${user.id}> has been muted for **${fromMs(time)}**!\n> ${reason}`
            });
        } catch {
            await interaction.reply({
                content: `\`❌\` Unable to mute <@${user.id}>.`
            });
        };
    }
});