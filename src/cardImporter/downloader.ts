const axios = require('axios').default;
const fs = require('fs');

(async(): Promise<void> => {
	const zippedSql = await axios({
		method: 'get',
		url: process.env.MTG_JSON_URL,
		responseType: 'stream'
	});
	await zippedSql.data.pipe(fs.createWriteStream('AllPrintings.sqlite.zip'));
})();
