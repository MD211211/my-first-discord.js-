const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .setDefaultMemberPermissions(PermissionsBitField.KickMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const targetUser = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    console.log(`${targetUser} is being kicked`)

    if (!targetUser) {
      return interaction.reply("You must provide a user to kick.");
    }

    if (!reason) {
      return interaction.reply("You must provide a reason for the kick.");
    }

    // Perform kick action here.
    interaction.reply(`Kicking ${targetUser} for reason: ${reason}`);
    targetUser.kick({ reason: reason });
  }
};