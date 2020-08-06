module.exports = {
	commands: {
		role: require("./src/role.js"),
		character: require("./src/character.js")
	},
	exists: function(cmd) {
		return typeof this.commands[cmd] != "undefined";
	},
	get: function(cmd) {
		return this.commands[cmd];
	}
}