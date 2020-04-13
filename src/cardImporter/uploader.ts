import {Database} from '../utils/db';
import {parseAndUploadCodex} from './codexParser';
import {unzipAndUploadFullSql} from './mtgJsonParser';

(async(): Promise<void> => {
	const db = new Database({
		connectionLimit: 25,
		database : 'foundry_db',
		host : process.env.DB_HOST,
		multipleStatements: true,
		password : process.env.DB_PASS,
		user : process.env.DB_USER,
	});

	try {
		await unzipAndUploadFullSql(db);
		await parseAndUploadCodex(db);
	} catch (err) {
		console.error(err);
	} finally {
		await db.close();
	}
})();
