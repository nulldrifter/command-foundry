import {Database} from '../utils/db';
import {parseAndUploadCodex} from './codexParser';
import {unzipAndUploadFullSql} from './mtgJsonParser';

(async(): Promise<void> => {
	const db = new Database({
		host : process.env.DB_HOST,
		user : process.env.DB_USER,
		password : process.env.DB_PASS,
		database : 'foundry_db',
		multipleStatements: true,
	});

	try {
		// TODO: dies if both are ran in sequence, works if one is commented out
		await unzipAndUploadFullSql(db);
		await parseAndUploadCodex(db);
	} catch (err) {
		console.error(err);
	} finally {
		await db.close();
	}
})();
