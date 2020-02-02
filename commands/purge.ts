/* eslint-disable vars-on-top */
import Discord, {
  Client,
  Message,
  TextChannel
} from "discord.js";
import {swiss_blue} from "../config";
import {error_red} from "../config"

export let name = 'purge';
export let description = 'Purges certin messages';
export let aliases = ['Purge'];
export let usage = '[Number of messages] <channel>';
export let cooldown = 5;

export async function execute(client: Client, message: Message, args: string[]) {
  const mentionedChannel = message.mentions.channels.first() || client.channels.get(args[0]) as TextChannel;
  const messagesDelete = parseInt(args[0])
  const mod = message.member.hasPermission("MANAGE_ROLES")
  if (!mod) {
    const noPerms = new Discord.RichEmbed();
    noPerms
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Missing Permisions')
      .setColor(error_red)
      .addField('Missing Perms!', `Hey <@${message.author.id}>, you are missing permissions to use this command.`);
    return message.channel.send(noPerms);
  }
  if (!args[1]) {
    if (messagesDelete > 0 && messagesDelete < 99) {
      const sucsess = new Discord.RichEmbed();
      sucsess
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Purge')
        .setColor(swiss_blue)
        .addField('Purged Messages', `I purged ${messagesDelete} messages!`);
      message.channel.bulkDelete(messagesDelete)
        .then(() => message.channel.send(sucsess))
        .catch((error) => {
          const err = new Discord.RichEmbed()
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(error_red)
            .addField('Error!', `An error occored. ${error}`);
          message.channel.send(err);
        });
      setTimeout(() => {
        message.delete();
      }, 2000);
    } else {
      const oops = new Discord.RichEmbed();
      oops
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Invalid Arguments')
        .setColor(error_red)
        .addField('Arguments!', 'Either you provided a number below 0, a number above 100, or it wasn\'t a number at all!');
      return message.channel.send(oops);
    }
  } else if (args[1]) {
    if (!mentionedChannel) {
      const yikes = new Discord.RichEmbed();
      yikes
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('What?')
        .setColor(error_red)
        .addField('What is that?', 'Thats not a channel? Try again with mentioning a channel');
      return message.channel.send(yikes);
    }
    const sucsess = new Discord.RichEmbed();
    sucsess
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Purge')
      .setColor(swiss_blue)
      .addField('Purged Messages', `I purged ${messagesDelete} messages!`);
    message.mentions.channels.first().bulkDelete(messagesDelete)
      .then(() => message.channel.send(sucsess))
      .catch((error) => {
        const err = new Discord.RichEmbed()
          .setTitle('Error')
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor(error_red)
          .addField('Error!', `An error occored. ${error}`);
        message.channel.send(err);
      });
    setTimeout(() => {
      message.delete();
    }, 2000);
  }
}