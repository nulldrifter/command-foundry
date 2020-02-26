import {Acceleration, Stax} from '../../../src/types/codex';

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
