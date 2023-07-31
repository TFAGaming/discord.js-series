import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to warn.')
                .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('reason')
                .setDescription('The reason of the warn.')
                .setRequired(false)
        ),
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user', true);
        const reason = interaction.options.getString('reason') || 'No reason was provided';

        await interaction.deferReply();

        await client.db.warn.create({
            data: {
                id: interaction.id,
                createdAt: Date.now(),
                moderatorId: interaction.user.id,
                userId: user.id,
                reason: reason
            }
        });

        await interaction.followUp({
            content: `${user.toString()} has been warned with the reason: **${reason}**`
        });

    }
});
