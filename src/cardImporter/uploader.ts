import {Database} from '../utils/db';
import {parseAndUploadCodex} from './codexParser';

import * as AdmZip from 'adm-zip';

const skipExistingRecords = (sql: string): string => sql
	.replace(/CREATE TABLE/gi, 'CREATE TABLE IF NOT EXISTS')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

const unzipSql = (): string => {
	const zip = new AdmZip('./AllPrintings.sqlite.zip'), // path is relative to the dir the npm script is ran
		[inserts] = zip.getEntries();
	return skipExistingRecords(zip.readAsText(inserts));
};

const unzipAndUploadFullSql = async (db: Database): Promise<void> => {
	await db.query(unzipSql());
};

(async(): Promise<void> => {
	const db = new Database({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USER,
		password : process.env.DB_PASS,
		database : 'foundry_db',
		multipleStatements: true,
	});

	try {
		// TODO: would be nice to break out full load and codex updates
		await unzipAndUploadFullSql(db);
		await parseAndUploadCodex(db);
	} catch (err) {
		console.error(err);
	} finally {
		await db.close();
	}
})();
