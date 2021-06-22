const https = require('https');

module.exports = {
	getInsultFromAPI: async function(who) {
		var apiUrl = process.env.API_URL;
		var apiKey = process.env.API_KEY;

		var url = apiUrl + '/?action=get-insult' + '&apikey=' + apiKey;

		if(who) {
			url += '&who=' + who;
		}

		const res = await new Promise(resolve => {
			https.get(url, resolve);
		});

		let data = await new Promise((resolve, reject) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('error', err => reject(err));
			res.on('end', () => resolve(data));
		});

		data = JSON.parse(data);

		return data.message;
	},
	execute: function(msg, args) {
		let channels = process.env.NSFW_CHANNELS.split(',');

		if(channels.indexOf(msg.channel.name) !== -1) {
			this.getInsultFromAPI(msg.author.username).then((insult) => {
				msg.channel.send(insult);
			})
		}
	}
}