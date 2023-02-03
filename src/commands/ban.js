const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban a user from the server")
    .setDefaultMemberPermissions(PermissionsBitField.BanMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const targetUser = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    console.log(`${targetUser} is being banned`)

    // Perform kick action here.
    interaction.reply(`banning ${targetUser} for reason: ${reason}`);
    targetUser.ban({ reason: reason });
  }
};




