import * as parser from 'simple-excel-to-json';
import {escape} from 'mysql'
import {Database} from '../utils/db';
import {Acceleration} from '../types/codex';


export const parseAccelerationSheetToSql = (sheet: Acceleration[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Cycle, Net, Ramped, Rank, Style, Synergies, Name} = card;
		inserts.push(`INSERT INTO acceleration (cardId, Cycle, Net, ramped, rank, style, synergies) SELECT id, ${escape(Cycle)}, ${escape(Net)}, ${escape(Ramped)}, ${escape(Rank)}, ${escape(Style)}, ${escape(Synergies)} FROM cards WHERE name LIKE ${escape(Name)};`)
	});

	return `DELETE FROM acceleration; ${inserts.join('')}`; // kill & fill, UPSERT would be more efficient here
};


export const parseAndUploadCodex = async (db: Database): Promise<void> => {
	const [acceleration, stax, counters, removal, wipes, tutors] = parser.parseXls2Json('./Codex.xlsx');
	await db.query(parseAccelerationSheetToSql(acceleration));
};
