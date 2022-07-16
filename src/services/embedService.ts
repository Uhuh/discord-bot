import { MessageEmbed, User } from 'discord.js-light';
import { COLOR } from '../../utilities/types/globals';
import Bot from '../../src/bot';
import { codeBlock } from '@discordjs/builders';
import { AVATAR_URL } from '../vars';

export class EmbedService {
  private static userTagInfo = (user: User | string): string => {
    return `${typeof user === 'string' ? user : user?.tag} (<@${
      typeof user === 'string' ? user : user.id
    }>)`;
  };

  /**
   * Generate a help embed based on the category type passed in.
   * @param type @Category type to filter out commands.
   * @param client Bot client to filter commands.
   * @returns Return built embed
   */
  public static helpEmbed = (type: string, client: Bot) => {
    const embed = new MessageEmbed();

    embed.setTitle(`**${type.toUpperCase()} commands**`).setColor(COLOR.AQUA);

    client.commands
      .filter((c) => c.type === type)
      .forEach((func) => embed.addField(`/${func.name}`, func.desc));

    return embed;
  };

  public static errorEmbed = (content: string) => {
    const embed = new MessageEmbed();

    embed
      .setColor(COLOR.RED)
      .setAuthor({ name: 'Bot', iconURL: AVATAR_URL })
      .setTitle(`Encountered an error`)
      .setDescription(codeBlock(content))
      .setTimestamp(new Date());

    return embed;
  };
}
