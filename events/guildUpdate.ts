import Bot from '../src/bot';
import { Guild, MessageEmbed } from 'discord.js';
import { Colors } from '../src/interfaces';
import { BotEventsWebhook } from '../utilities/types/globals';

export const guildUpdate = async (
  guild: Guild,
  type: 'Left' | 'Joined',
  client: Bot
) => {
  const color = type === 'Joined' ? Colors.green : Colors.red;
  try {
    const size = (
      await client.shard?.fetchClientValues('guilds.cache.size')
    )?.reduce<number>((a, b) => a + Number(b), 0);

    const embed = new MessageEmbed();

    embed
      .setColor(color)
      .setTitle(`**${type} Guild**`)
      .setThumbnail(guild.iconURL() || '')
      .setDescription(guild.name)
      .addField('Member size:', `${guild.memberCount}`, true)
      .addField('Guild ID:', `${guild.id}`, true)
      .setFooter({
        text: `Guilds I'm in: ${size}`,
      });

    BotEventsWebhook.send({
      embeds: [embed],
    });
  } catch (e) {
    console.error(`Failed to send guild update webhook`);
    console.error(`${e}`);
  }
};
