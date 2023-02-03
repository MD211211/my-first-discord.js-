const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msg")
    .setDescription("Sends a message to a specific user")
    .addUserOption(option => option.setName("recipient").setDescription("The user to send the message to").setRequired(true))
    .addStringOption(option => option.setName("message").setDescription("The message to send").setRequired(true)),
    run: async (client, interaction) => {
      let recipient = interaction.options.getMember("recipient");
      if (!recipient) {
        return interaction.reply("Please mention a user to send a message to.");
      }
      let message = interaction.options.getString("message");
      if (!message) {
        return interaction.reply("Please provide a message to send.");
      }
      recipient.send(message).catch(err => {
        interaction.reply(`Failed to send message to ${recipient.name}.`);
      });

      interaction.reply(`Message sent to ${recipient.username}.`);
      return recipient.send(message);
    }
};

