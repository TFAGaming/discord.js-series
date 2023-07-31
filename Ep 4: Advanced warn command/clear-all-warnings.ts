import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('clear-all-warnings')
        .setDescription('Clear a user\'s punishments history..')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to clear.')
                .setRequired(true)
        ),
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user', true);

        await interaction.deferReply();

        const data = await client.db.warn.findMany({
            where: {
                userId: user.id
            }
        });

        if (data.length <= 0) {
            await interaction.followUp({
                content: 'That user has currently no warnings.'
            });

            return;
        };

        await client.db.warn.deleteMany({
            where: {
                userId: user.id
            }
        });

        await interaction.followUp({
            content: `${user.toString()}'s warnings history has been cleared.`
        });

    }
});