import * as parser from 'simple-excel-to-json';
import {escape} from 'mysql';
import {Database} from '../utils/db';
import {Acceleration, Stax} from '../types/codex';


export const parseAccelerationSheetToSql = (sheet: Acceleration[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Cycle, Net, Ramped, Rank, Style, Synergies, Name} = card;
		inserts.push(`INSERT INTO acceleration (cardId, cycle, net, ramped, rank, style, synergies) SELECT id, ${escape(Cycle)}, ${escape(Net)}, ${escape(Ramped)}, ${escape(Rank)}, ${escape(Style)}, ${escape(Synergies)} FROM cards WHERE name LIKE ${escape(Name)};`);
	});

	return `DELETE FROM acceleration; ${inserts.join('')}`;
};

export const parseStaxSheetToSql = (sheet: Stax[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Rank, Attacks, Name} = card;
		inserts.push(`INSERT INTO stax (cardId, rank, attacks) SELECT id, ${escape(Rank)}, ${escape(Attacks)} FROM cards WHERE name LIKE ${escape(Name)};`);
	});

	return `DELETE FROM stax; ${inserts.join('')}`;
};

export const parseAndUploadCodex = async (db: Database): Promise<void> => {
	// TODO: parse 'removal' tab once populated
	const [acceleration, stax, counters, removal, wipes, tutors] = parser.parseXls2Json('./Codex.xlsx');
	await Promise.all([
		db.query(parseAccelerationSheetToSql(acceleration)),
		db.query(parseStaxSheetToSql(stax))
	]);
};
