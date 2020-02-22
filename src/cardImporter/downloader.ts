import * as AdmZip from 'adm-zip';
import * as request from 'request';
import {Database} from '../utils/db';

const url = 'https://www.mtgjson.com/files/AllPrintings.sql.zip';
let sql = '';

const massageSql = (sql: string): string => sql
	.split('\n')
	.splice(190)
	.join('\n')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

(async() => {
	const db = new Database({
		host     : 'localhost',
		user     : 'root',
		password : 'new_password',
		database : 'foundry_db',
		multipleStatements: true,
	});

	request.get({url, encoding: null}, async (err, res, body) => {
		var zip = new AdmZip(body);
		var zipEntries = zip.getEntries();
		console.log(zipEntries.length);

		zipEntries.forEach((entry) => {
			sql += zip.readAsText(entry);
		});

		const cleanSQL = massageSql(sql);

		await db.query(cleanSQL);
	});

})();
