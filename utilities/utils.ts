import { APIRole } from 'discord-api-types';
import {
  ButtonInteraction,
  CommandInteraction,
  Interaction,
  Role,
  SelectMenuInteraction,
} from 'discord.js-light';

import { LogService } from '../src/services/logService';
import { CLIENT_ID } from '../src/vars';

/**
 * Break up and existing array into multiple chunks.
 * @param arr - Anything we want to split up.
 * @param chunkSize - The size of the array chunks.
 * @returns Array of new chunks.
 */
export const spliceIntoChunks = <T>(
  arr: readonly T[],
  chunkSize: number
): T[][] => {
  const result: T[][] = [];
  const arrCopy = [...arr];
  while (arrCopy.length > 0) result.push(arrCopy.splice(0, chunkSize));
  return result;
};

/**
 * Handle replying to the interaction and error handling if replies fail.
 * @param logger - Respective slash command
 * @param interaction - Interaction that was run
 * @param content - Content to reply to user with
 */
export const handleInteractionReply = (
  logger: LogService,
  interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction,
  content: { content: string; ephemeral?: boolean } | string
) => {
  interaction.reply(content).catch((interactionError) => {
    interaction.channel
      ?.send(typeof content === 'string' ? content : content.content)
      .catch((channelError) =>
        logger.error(
          `Failed to reply to interaction and failed to send channel message.\n\t\t\t${interactionError}\n\t\t\t${channelError}`
        )
      );
  });
};

/**
 * Check that the bot has a role above the one the user wants to hand out.
 * @returns true if the bot has a role above the users role.
 */
export async function isValidRolePosition(
  interaction: Interaction,
  role: Role | APIRole
) {
  const clientUser = await interaction.guild?.members
    .fetch(CLIENT_ID)
    .catch(() => console.log(`Failed to fetch client user for guild.`));

  if (!clientUser) return false;

  return clientUser.roles.highest.position > role.position;
}
