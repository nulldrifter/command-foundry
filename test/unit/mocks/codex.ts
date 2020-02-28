import {Acceleration, BoardWipes, CardAdvantage, Counters, Stax, Tutors} from '../../../src/types/codex';

export const accelerationSheet: Acceleration[] = [
	{
		Name: 'Chrome Mox',
		Rank: 0,
		Cycle: 'Power',
		Style: 'Rock',
		Ramped: 1,
		Net: 1,
		Synergies: '',
	},
	{
		Name: 'Carpet of Flowers',
		Rank: 0,
		Cycle: '',
		Style: 'Trigger',
		Ramped: '2+',
		Net: '2+',
		Synergies: 'hating on Urza',
	}
];

export const staxSheet: Stax[] = [
	{
		Name: 'Back to Basics',
		Rank: 1,
		Attacks: 'Tap, Mana',
	},
	{
		Name: 'Blood Moon',
		Rank: 1,
		Attacks: 'Mana',
	}
];

export const countersSheet: Counters[] = [
	{ Name: 'Force of Will',
		Rank: 0,
		Alt_Cost: 0,
		'Add._Cost': '1 Blue Card',
		Target: 'Spell',
	},
	{
		Name: 'Mental Misstep',
		Rank: 0,
		Alt_Cost: 0,
		'Add._Cost': '2 Life',
		Target: 'CMC',
	},
];

export const wipesSheet: BoardWipes[] = [
	{
		Name: 'Engineered Explosives',
		Rank: 2,
		Style: 'Destroy',
		Toughness: '',
		Removed: 'Nonlands',
		'Player(s)': 'All',
		Timing: 'Activated',
		Upside: 'X',
	},
	{
		Name: 'Living End',
		Rank: 4,
		Style: 'Sacrifice',
		Toughness: '',
		Removed: 'Creatures',
		'Player(s)': 'All',
		Timing: 'Upkeep',
		Upside: '',
	},
];

export const tutorsSheet: Tutors[] = [
	{
		Name: 'Academy Rector',
		Rank: 2,
		Finds: 'Enchantment',
		Puts: 'Battlefield',
		Quantity: 1,
	},
	{
		Name: 'Acquire',
		Rank: 4,
		Finds: 'Artifact',
		Puts: 'Battlefield',
		Quantity: 1,
	},
];

export const cardAdvantageSheet: CardAdvantage[] = [
	{
		Name: 'Ambition\'s Cost',
		Rank: '',
		Style: 'One-shot',
		Repeat: '',
		Fixed: 'Card',
	},
	{
		Name: 'Ancestral Vision',
		Rank: '',
		Style: 'One-shot',
		Repeat: '',
		Fixed: 'Card',
	}
];
