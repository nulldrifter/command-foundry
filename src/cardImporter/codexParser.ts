import * as parser from 'simple-excel-to-json';
import {escape} from 'mysql';
import {Database} from '../utils/db';
import {Acceleration, BoardWipes, CardAdvantage, Counters, Stax, Tutors} from '../types/codex';


// @ts-ignore
const convertEmptyStringToNull = (field: string|number): number => field === '' ? null : field;

const cleanInputs = (args: (string|number)[]): (string|number)[] => args.map(arg => typeof arg === 'string' ? escape(arg.trim()) : arg);


export const parseAccelerationToSql = (sheet: Acceleration[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Cycle, Net, Ramped, Rank, Style, Synergies, Name} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [cycle, net, ramped, rank, style, synergies, name] = cleanInputs([Cycle, Net, Ramped, sanitizedRank, Style, Synergies, Name]);
		const upsert = `
			INSERT INTO acceleration (cardId, cycle, net, ramped, rank, style, synergies)
				SELECT id, ${cycle}, ${net}, ${ramped}, ${rank}, ${style}, ${synergies} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE cycle = ${cycle}, net = ${net}, ramped = ${ramped}, rank = ${rank}, style = ${style}, synergies = ${synergies};`;
		inserts.push(upsert);
	});

	return `DELETE FROM acceleration; ${inserts.join('')}`;
};


export const parseStaxToSql = (sheet: Stax[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Rank, Attacks, Name} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [rank, attacks, name] = cleanInputs([sanitizedRank, Attacks, Name]);
		const upsert = `
			INSERT INTO stax (cardId, rank, attacks)
				SELECT id, ${rank}, ${attacks} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE rank = ${rank}, attacks = ${attacks};`;
		inserts.push(upsert);
	});

	return `DELETE FROM stax; ${inserts.join('')}`;
};


/* eslint-disable @typescript-eslint/camelcase */
export const parseCountersToSql = (sheet: Counters[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Rank, Alt_Cost, 'Add._Cost': AdditionalCost, Name, Target} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [rank, altCost, additionalCost, name, target] = cleanInputs([sanitizedRank, Alt_Cost, AdditionalCost, Name, Target]);
		const upsert = `
			INSERT INTO counters (cardId, additionalCost, altCost, rank, targets)
				SELECT id, ${additionalCost}, ${altCost}, ${rank}, ${target} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE additionalCost = ${additionalCost}, altCost = ${altCost}, rank = ${rank}, targets = ${target};`;
		inserts.push(upsert);
	});

	return `DELETE FROM counters; ${inserts.join('')}`;
};
/* eslint-enable @typescript-eslint/camelcase */


export const parseWipesToSql = (sheet: BoardWipes[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Name, 'Player(s)': Players, Rank, Removed, Style, Timing, Toughness, Upside} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [name, players, rank, removed, style, timing, toughness, upside] = cleanInputs([Name, Players, sanitizedRank, Removed, Style, Timing, Toughness, Upside]);
		const upsert = `
			INSERT INTO board_wipes (cardId, playersAffected, rank, style, removes, timing, toughness, upsides)
				SELECT id, ${players}, ${rank}, ${style}, ${removed}, ${timing}, ${toughness}, ${upside} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE playersAffected = ${players}, rank = ${rank}, style = ${style}, removes = ${removed}, timing = ${timing}, toughness = ${toughness}, upsides = ${upside};`;
		inserts.push(upsert);
	});

	return `DELETE FROM board_wipes; ${inserts.join('')}`;
};


export const parseTutorsToSql = (sheet: Tutors[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Finds, Name, Puts, Quantity, Rank} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [finds, name, puts, quantity, rank] = cleanInputs([Finds, Name, Puts, Quantity, sanitizedRank]);
		const upsert = `
			INSERT INTO tutors (cardId, finds, puts, quantity, rank)
				SELECT id, ${finds}, ${puts}, ${quantity}, ${rank} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE finds = ${finds}, puts = ${puts}, quantity = ${quantity}, rank = ${rank};`;
		inserts.push(upsert);
	});

	return `DELETE FROM tutors; ${inserts.join('')}`;
};


export const parseCardAdvantageToSql = (sheet: CardAdvantage[]): string => {
	const inserts: string[] = [];
	sheet.forEach(card => {
		const {Name, Rank, Style, Repeat: RepeatsEach, Fixed} = card;
		const sanitizedRank = convertEmptyStringToNull(Rank);
		const [name, rank, style, repeatsEach, fixed] = cleanInputs([Name, sanitizedRank, Style, RepeatsEach, Fixed]);
		const upsert = `
			INSERT INTO card_advantage (cardId, fixed, rank, repeatsEach, style)
				SELECT id, ${fixed}, ${rank}, ${repeatsEach}, ${style} FROM cards WHERE name LIKE ${name}
			ON DUPLICATE KEY
				UPDATE fixed = ${fixed}, rank = ${rank}, repeatsEach = ${repeatsEach}, style = ${style};`;
		inserts.push(upsert);
	});

	return `DELETE FROM card_advantage; ${inserts.join('')}`;
};


export const parseAndUploadCodex = async (db: Database): Promise<(void)> => {
	const [acceleration, stax, counters, removal, wipes, tutors, cardAdvantage] = parser.parseXls2Json('./Codex.xlsx'); // eslint-disable-line @typescript-eslint/no-unused-vars
	await Promise.all([
		db.query(parseAccelerationToSql(acceleration)),
		db.query(parseStaxToSql(stax)),
		db.query(parseCountersToSql(counters)),
		db.query(parseWipesToSql(wipes)),
		db.query(parseTutorsToSql(tutors)),
		db.query(parseCardAdvantageToSql(cardAdvantage)),
	]);
};
