import RB from './bot';

const Bot = new RB();

Bot.start().catch((e) =>
  Bot.log.error(`Bot has encounter an error while starting up. ${e}`)
);

export default Bot;
