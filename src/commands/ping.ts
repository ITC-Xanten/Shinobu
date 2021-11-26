import { Discord, Slash } from 'discordx';
import { CommandInteraction } from 'discord.js';

@Discord()
abstract class Ping {
    @Slash('ping')
    private async ping(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    }
}