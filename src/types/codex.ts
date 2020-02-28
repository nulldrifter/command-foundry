export interface Acceleration {
	Cycle: string;
	Name: string;
	Net: string|number;
	Ramped: string|number;
	Rank: string|number;
	Style: string;
	Synergies: string;
}

export interface Stax {
	Attacks: string;
	Name: string;
	Rank: number;
}

export interface Counters {
	'Add._Cost': string|number;
	Alt_Cost: string|number;
	Name: string;
	Rank: number;
	Target: string;
}

export interface BoardWipes {
	'Player(s)': string;
	Name: string;
	Rank: number;
	Removed: string;
	Style: string;
	Timing: string;
	Toughness: string|number;
	Upside: string;
}

export interface Tutors {
	Finds: string;
	Name: string;
	Puts: string;
	Quantity: string|number;
	Rank: number;
}

export interface CardAdvantage {
	Fixed: string;
	Name: string;
	Rank: number|string;
	Repeat: string;
	Style: string;
}
