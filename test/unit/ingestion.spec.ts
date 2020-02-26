import {parseAccelerationSheetToSql, parseStaxSheetToSql} from '../../src/cardImporter/codexParser';
import * as codexMocks from './mocks/codex';

describe('card ingestion', () => {
  xdescribe('fetching and transforming card data', () => {
    it(`should download a zip file`, () => {

    });
  });


  xdescribe('uploading card data to database', () => {
    it(`should strip the table creation statements`, () => {

    });

    it(`should add IGNORE to each insert statement`, () => {

    });

    it(`should insert MTGJSON data into the db`, () => {

    });

    it(`should insert Codex data into the db`, () => {

    });
  });


  describe('codex parser', () => {
    it(`should parse the relevant sheets`, () => {

    });

    it(`should upload the data from each sheet in parallel`, () => {

    });

    it(`should always escape user inputs`, () => {

    });


    describe('sheet parsers', () => {
      it(`should convert the 'Acceleration' tab to SQL statements`, () => {
        const sql = parseAccelerationSheetToSql(codexMocks.accelerationSheet);
        expect(sql).toContain('DELETE FROM acceleration;');
        expect(sql).toContain(`INSERT INTO acceleration (cardId, cycle, net, ramped, rank, style, synergies) SELECT id, '', '2+', '2+', 0, 'Trigger', 'hating on Urza' FROM cards WHERE name LIKE 'Carpet of Flowers';`);
      });

      it(`should convert the 'Stax' tab to SQL statements`, () => {
        const sql = parseStaxSheetToSql(codexMocks.staxSheet);
        expect(sql).toContain('DELETE FROM stax;');
        expect(sql).toContain(`INSERT INTO stax (cardId, rank, attacks) SELECT id, 1, 'Tap, Mana' FROM cards WHERE name LIKE 'Back to Basics';`)
      });
    });

  })
});
