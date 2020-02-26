import {parseAccelerationSheetToSql} from '../../src/cardImporter/codexParser';
import {Acceleration} from '../../src/types/codex';

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


  // TODO: configure jest for TS
  describe('codex parser', () => {
    it(`should convert the 'Acceleration' tab to SQL statements`, () => {
      const mockAccelerationData: Acceleration[] = [
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
          Name: 'Mana Crypt',
          Rank: 0,
          Cycle: 'Power',
          Style: 'Rock',
          Ramped: 2,
          Net: 2,
          Synergies: '',

        },
        {
          Name: 'Carpet of Flowers',
          Rank: 0,
          Cycle: '',
          Style: 'Trigger',
          Ramped: '2+',
          Net: '2+',
          Synergies: '',
        }
      ];
      const sql = parseAccelerationSheetToSql(mockAccelerationData);

      expect(sql).toEqual('');
    });
  })
});
