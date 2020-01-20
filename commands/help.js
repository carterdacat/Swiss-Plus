const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands', 'Help', 'Commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(client, message, args) {
    const {
      commands,
    } = message.client;

    if (!args.length) {
      const help = new Discord.RichEmbed();
      const comds = commands.map((command) => command.name).join(', ');
      help
        .setTitle('Help!')
        .setColor('#4DF8E8')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Commands:', `${comds}`)
        .addField('Tip:', 'You can send `!help [command name]` to get info on a specific command!');
      return message.author.send(help)
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('I\'ve sent you a DM with all my commands!');
        })
        .catch((error) => {
          const unAbleDm = Discord.RichEmbed;
          unAbleDm
            .setTitle('Error!')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#F90B0B')
            .setTitle('Error', 'Unable to send you a dmd with my commands! This may be because your dms are turned off. Please try again later.')
            .addField('Error:', error);
          message.channel.send(unAbleDm);
        });
    }

    const name = args[0].toLowerCase();
    // eslint-disable-next-line max-len
    const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      const nValidComm = new Discord.RichEmbed();
      nValidComm
        .setTitle('Error!')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#E80C0C')
        .addField('Invalid Command!', 'The Command you put in is invalid!');
      return message.reply(nValidComm);
    }

    const cmdName = `${command.name}`;
    const cmd = new Discord.RichEmbed();
    cmd
      .setTitle('Help')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField('Command:', cmdName);

    if (command.aliases) {
      const alli = `${command.aliases.join(', ')}`;
      cmd.addField('Aliases:', alli);
    }
    if (command.description) {
      const description1 = `${command.description}`;
      cmd.addField('Description', description1);
    }
    if (command.usage) {
      const usage = `!${command.name} ${command.usage}`;
      cmd.addField('Usage:', usage);
    }
    const cmdCoolDown = `${command.cooldown || 3} second(s)`;
    cmd.addField('Cooldown:', cmdCoolDown);
    return message.channel.send(cmd);
  },
};
