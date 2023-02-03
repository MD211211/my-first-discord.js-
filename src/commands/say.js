const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say anything")
    .addStringOption(option => option.setName("message").setDescription("The message to say").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (client, interaction) => {
    // Create an Embed message
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setDescription(interaction.options.getString("message"))
      .setTimestamp();

    // Send the message
    interaction.channel.send({ embeds: [embed]});
  }
};
