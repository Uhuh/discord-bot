### Discord bot template in TypeScript.

## Hosting environment.
It is ***ideal that you do this in a linux environment.*** You can run this bot just fine in Windows Subsystem for Linux (WSL). This is what I use. If you want to install this go [here](https://docs.microsoft.com/en-us/windows/wsl/install).

**For the sake of this "guide" I am setting up in a debian (Ubuntu/WSL) enviroment for [yarn](https://classic.yarnpkg.com/lang/en/docs/install) and [nvm](https://github.com/nvm-sh/nvm).**

## Install nvm
To install `nvm` you need to use `curl`, incase you don't have `curl` installed here's the command to install
> `sudo apt install curl`

Now install nvm
> `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

Now you need to logout and login again to load the `nvm` environment correctly, or you can run this command to do the same.
> `source ~/.profile`

Now confirm it was installed correctly with
> `nvm --version`

## Use nvm to install node/npm

Since this version of the bot at time of writing uses `discord.js@13.X` we're required to use `node@16` minimum. So let's install `node@16` with nvm and set the default version to 16.
> `nvm install 16 && nvm alias default 16`

## Install yarn with npm
Now let's install `yarn` globally.
> `npm install --global yarn`

## **Your environment should be good to go from here**
If you don't have `git` installed do this..
> `sudo apt install git`

Now that we have `git` installed let's clone down the repo, change directory, and install our dependecies.
> `git clone https://github.com/Uhuh/discord-bot.git`

> `cd discord-bot`

> `yarn install`

Great! We should have our dependencies installed. Now let's update some tokens so we can turn the bot on.

I use `dotenv` and have an example .env in this repo [here](https://github.com/Uhuh/discord-bot/blob/master/.env.example). You can copy it and make a new file `.env`
```.env
TOKEN=your super_secret_bot_token
DB_NAME=postgres_db_name
POSTGRES_URL=postgres://username:password@ip:5432/
# Set to 1 if you're working in a dev environment.
SYNC_DB=0
```
> Don't want to use dotenv? Update the variables in `src/vars.ts` instead.

**After setting this all up you should be able to run `yarn start`**