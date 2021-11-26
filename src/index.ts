import 'reflect-metadata';
import { Intents, Interaction, Message } from 'discord.js';
import { Client } from 'discordx';
import { importx } from '@discordx/importer';
import dotenv from 'dotenv';

const guildId = process.env.GUILD_ID;

const client = new Client({
    botGuilds: process.env.ENV === 'DEV' && guildId ? [guildId] : undefined,
    simpleCommand: {
        prefix: '!',
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

client.once('ready', async () => {
    // init all application commands
    await client.initApplicationCommands({
        guild: {log: true},
        global: {log: true},
    });

    // init permissions; enabled log to see changes
    await client.initApplicationPermissions(true);

    console.log('Bot started');
});

client.on('interactionCreate', (interaction: Interaction) => {
    client.executeInteraction(interaction);
});

client.on('messageCreate', (message: Message) => {
    client.executeCommand(message);
});

async function run() {
    // load environment variables
    dotenv.config();
    // import all commands and events
    await importx(__dirname + '/{events,commands}/**/*.{ts,js}');
    // start the client
    client.login(process.env.BOT_TOKEN ?? '');
}

run();