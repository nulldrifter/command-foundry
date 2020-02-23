import {Database} from '../utils/db';

const AdmZip = require('adm-zip');

const massageSql = (sql: string): string => sql
	.split('\n')
	.splice(190)
	.join('\n')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

const unzipSql = (): string => {
	const zip = new AdmZip('./AllPrintings.sqlite.zip'), // path is relative to the dir the npm script is ran
		[inserts] = zip.getEntries();
	return massageSql(zip.readAsText(inserts));
};

(async(): Promise<void> => {
	const db = new Database({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USER,
		password : process.env.DB_PASS,
		database : 'foundry_db',
		multipleStatements: true,
	});

	await db.query(unzipSql());
	await db.close();
	console.log('done');
	return Promise.resolve();
})();


export class Foo {

}
