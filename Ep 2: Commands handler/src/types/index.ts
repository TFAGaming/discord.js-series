import { SlashCommandBuilder, ContextMenuCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import ExtendedClient from "../class/ExtendedClient";

export interface Command {
    structure: SlashCommandBuilder | ContextMenuCommandBuilder,
    run: (client: ExtendedClient, interaction: ChatInputCommandInteraction) => void
};