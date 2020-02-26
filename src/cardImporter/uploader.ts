import {Database} from '../utils/db';
import {parseAndUploadCodex} from './codexParser';

const AdmZip = require('adm-zip');

const massageSql = (sql: string): string => sql
	.split('\n')
	.splice(190) // rm CREATE TABLE statements
	.join('\n')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO'); // ignore records we already have

const unzipSql = (): string => {
	const zip = new AdmZip('./AllPrintings.sqlite.zip'), // path is relative to the dir the npm script is ran
		[inserts] = zip.getEntries();
	return massageSql(zip.readAsText(inserts));
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
		// await unzipAndUploadFullSql(db);
		await parseAndUploadCodex(db);
	} catch (err) {
		console.error(err);
	} finally {
		await db.close();
	}
})();
