const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  
  const ms = require("ms");
  
module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the timeout(e.g. 1m, 1h, 1d,)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the timeout")
        .setMaxLength(512)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const { guild, member, options } = interaction;
    const user = options.getMember("user");
    const duration = options.getString("duration");
    const reason = options.getString("reason") || "No reason provided";

    const errorsArray = [];

    const erorsEmbed = new EmbedBuilder()
      .setAuthor({
        name: "Could not timeout user due to",
      })
      .setColor("Red");

    if (!user)
      return interaction.reply({
        embeds: [erorsEmbed.setDescription("user not found").ephemeral(true)],
      });

    if (!ms(duration) || ms(duration) > ms("28d"))
      errorsArray.push(
        "Invalid duration provided or duration is longer than 28 days."
      );
    if (!user.manageable || !user.moderatable)
      errorsArray.push("this user is not moderatable by the bot.");

    if (member.roles.highest.position < user.roles.highest.position)
      errorsArray.push(
        "You cannot timeout a user with a higher role than you."
      );

    if (errorsArray.length > 0) {
      return interaction.reply({
        embeds: [erorsEmbed.setDescription(errorsArray.join("\n"))],
        ephemeral: true,
      });
    }
    let timeError = false;
    await user.timeout(ms(duration), reason).catch(() => (timeError = true));

    if (timeError) {
      interaction.reply({
        embeds: [
          errorsEmbed.setDescription(
            "Could not timeout user due to an uncommon error. Cannot take negative values"
          ),
        ],
        ephemeral: true,
      });
      return console.log("Error occured in Timeout.js ", err);
    }
    const successEmbed = new EmbedBuilder()
      .setAuthor({
        name: "Timeout issued",
        iconURL: guild.iconURL(),
      })
      .setColor("Green")
      .setDescription(
        [
          `${user} was issued a timeout for **${ms(ms(duration), {
            long: true,
          })}** by ${member}`,,
          `\nReason: ${reason}`,
        ].join("\n")
      );
    interaction.reply({
      embeds: [successEmbed],
    });
  }
};
