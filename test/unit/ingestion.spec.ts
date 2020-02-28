import {
  parseAccelerationToSql,
  parseCardAdvantageToSql,
  parseCountersToSql,
  parseStaxToSql,
  parseTutorsToSql,
  parseWipesToSql
} from '../../src/cardImporter/codexParser';
import * as codexMocks from './mocks/codex';

describe('Codex Parser', () => {
  it(`should convert the 'Acceleration' tab to SQL statements`, () => {
    const sql = parseAccelerationToSql(codexMocks.accelerationSheet);
    expect(sql).toContain('DELETE FROM acceleration;');
    expect(sql).toContain(`INSERT INTO acceleration (cardId, cycle, net, ramped, rank, style, synergies) SELECT id, '', '2+', '2+', 0, 'Trigger', 'hating on Urza' FROM cards WHERE name LIKE 'Carpet of Flowers';`);
  });

  it(`should convert the 'Stax' tab to SQL statements`, () => {
    const sql = parseStaxToSql(codexMocks.staxSheet);
    expect(sql).toContain('DELETE FROM stax;');
    expect(sql).toContain(`INSERT INTO stax (cardId, rank, attacks) SELECT id, 1, 'Tap, Mana' FROM cards WHERE name LIKE 'Back to Basics';`)
  });

  it(`should convert the 'Counters' tab to SQL statements`, () => {
    const sql = parseCountersToSql(codexMocks.countersSheet);
    expect(sql).toContain('DELETE FROM counters;');
    expect(sql).toContain(`INSERT INTO counters (cardId, additionalCost, altCost, rank, targets) SELECT id, '1 Blue Card', 0, 0, 'Spell' FROM cards WHERE name LIKE 'Force of Will';`)
  });

  it(`should convert the 'Wipes' tab to SQL statements`, () => {
    const sql = parseWipesToSql(codexMocks.wipesSheet);
    expect(sql).toContain('DELETE FROM board_wipes;');
    expect(sql).toContain(`INSERT INTO board_wipes (cardId, playersAffected, rank, style, targets, timing, toughness, upsides) SELECT id, 'All', 2, 'Destroy', 'Nonlands', 'Activated', '', 'X' FROM cards WHERE name LIKE 'Engineered Explosives';`)
  });

  it(`should convert the 'Tutors' tab to SQL statements`, () => {
    const sql = parseTutorsToSql(codexMocks.tutorsSheet);
    expect(sql).toContain('DELETE FROM tutors;');
    expect(sql).toContain(`INSERT INTO tutors (cardId, finds, puts, quantity, rank) SELECT id, 'Artifact', 'Battlefield', 1, 4 FROM cards WHERE name LIKE 'Acquire';`)
  });

  it(`should convert the 'Card Advantage' tab to SQL statements`, () => {
    const sql = parseCardAdvantageToSql(codexMocks.cardAdvantageSheet);
    expect(sql).toContain('DELETE FROM card_advantage;');
    expect(sql).toContain(`INSERT INTO card_advantage (cardId, fixed, rank, repeatsEach, style) SELECT id, 'Card', null, '', 'One-shot' FROM cards WHERE name LIKE 'Ancestral Vision';`)
  });
});
