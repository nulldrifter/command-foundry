export interface Acceleration {
	Cycle: string
	Name: string
	Net: string|number
	Ramped: string|number
	Rank: string|number
	Style: string
	Synergies: string
}

export interface Stax {
	Attacks: string
	Name: string
	Rank: number
}

export interface Counters {
	Rank: number
	AltCost: string|number
	AdditionalCost: string
	Name: string
	Target: string
}

export interface BoardWipes {
	Name: string
	'Player(s)': string
	Rank: number
	Removed: string
	Style: string
	Timing: string
	Toughness: string|number
	Upside: string
}

export interface Tutors {
	Finds: string
	Name: string
	Puts: string
	Quantity: string|number
	Rank: number
}

export interface CardAdvantage {
	Name: string
	Rank: number
	Style: string
	Repeat: string
	Fixed: string
}
