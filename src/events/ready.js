const { ActivityType, Client } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client
	 */
	execute(client) {
    setInterval(() => client.user.setPresence(`over ${client.guilds.cache.size}`), 22000);
}};
