import {Database} from '../utils/db';

const AdmZip = require('adm-zip');

const massageSql = (sql: string): string => sql
	.split('\n')
	.splice(190)
	.join('\n')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

const unzipSql = (): string => {
	const zip = new AdmZip('../../AllPrintings.sqlite.zip'),
		[inserts] = zip.getEntries();
	return massageSql(zip.readAsText(inserts));
};

(async(): Promise<void> => {
	const db = new Database({
		host     : '',
		user     : '',
		password : '',
		database : 'foundry_db',
		multipleStatements: true,
	});

	await db.query(unzipSql());
	await db.close();
	return Promise.resolve();
})();
