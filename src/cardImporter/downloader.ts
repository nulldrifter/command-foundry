const axios = require('axios').default;
const fs = require('fs');

(async(): Promise<void> => {
	const zippedSql = await axios({
		method: 'get',
		url: 'https://www.mtgjson.com/files/AllPrintings.sql.zip',
		responseType: 'stream'
	});
	await zippedSql.data.pipe(fs.createWriteStream('AllPrintings.sqlite.zip'));
})();
