import * as AdmZip from 'adm-zip';
import {Database} from '../utils/db';

const skipExistingRecords = (sql: string): string => sql
	.replace(/CREATE TABLE/gi, 'CREATE TABLE IF NOT EXISTS')
	.replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

const unzipSql = (): string => {
	const zip = new AdmZip('./AllPrintings.sqlite.zip'), // path is relative to the dir the npm script is ran
		[inserts] = zip.getEntries();
	return skipExistingRecords(zip.readAsText(inserts));
};

export const unzipAndUploadFullSql = async (db: Database): Promise<void> => {
	await db.query(unzipSql());
};
