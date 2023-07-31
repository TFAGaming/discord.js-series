import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName('remove-warning')
        .setDescription('Remove a user warning.')
        .addStringOption((opt) =>
            opt.setName('id')
                .setDescription('The warn ID.')
                .setRequired(true)
        ),
    run: async (client, interaction) => {

        const id = interaction.options.getString('id', true);

        await interaction.deferReply();

        const data = await client.db.warn.findMany({
            where: {
                id: id
            }
        });

        if (data.length <= 0) {
            await interaction.followUp({
                content: 'No warning ID was found.'
            });

            return;
        };

        await client.db.warn.deleteMany({
            where: {
                id: id
            }
        });

        await interaction.followUp({
            content: `The warning ID (${id}) has been deleted.`
        });

    }
});