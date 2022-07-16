import Bot from '../src/bot';
import { REST } from '@discordjs/rest';
import {
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from 'discord-api-types/v9';
import { CLIENT_ID, TOKEN } from '../src/vars';
import { LogService } from '../src/services/logService';
import * as generalCommands from './general';

const rest = new REST({ version: '9' }).setToken(TOKEN);

export default (client: Bot) => {
  const log = new LogService('SlashCommandHandler');
  log.info(`Loading all slash commands...`);

  const commandsJson: Array<RESTPostAPIApplicationCommandsJSONBody> = [];

  // Use the slash commands name generated from their data.
  for (const cmd of [
    ...Object.values(generalCommands).map((c) => new c(client)),
  ]) {
    client.commands.set(cmd.data.name.toLowerCase(), cmd);
    commandsJson.push(cmd.data.toJSON());
  }

  // Deleting global commands. (:
  //deleteSlashCommands();

  // Generate global slash commands
  //generateSlashCommands(commandsJson);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function generateSlashCommands(
  commandsJson: RESTPostAPIApplicationCommandsJSONBody[]
) {
  const log = new LogService('GenerateSlashCommands');
  // Make a request to Discord to create all the slash commands.
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commandsJson,
    });
    log.info(`Created slash commands successfully.`);
  } catch (e) {
    log.error(`Errored when trying to create slash commands.\n${e}\n`);
  }
}

/**
 * I just need a simple way to delete all the stupid global commands.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function deleteSlashCommands() {
  const log = new LogService('DeleteSlashCommands');

  try {
    rest.get(Routes.applicationCommands(CLIENT_ID)).then((data) => {
      const promises = [];
      for (const command of data as { id: string }[]) {
        promises.push(
          rest.delete(`${Routes.applicationCommands(CLIENT_ID)}/${command.id}`)
        );
      }

      return Promise.all(promises);
    });
  } catch (e) {
    log.error(`Errored when trying to delete global slash commands.\n${e}\n`);
  }
}
