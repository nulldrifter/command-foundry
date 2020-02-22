const AdmZip = require('adm-zip');

const massageSql = (sql: string): string => sql
  .split('\n')
  .splice(190)
  .join('\n')
  .replace(/INSERT INTO/gi, 'INSERT IGNORE INTO');

const unzipSql = (): string => {
  const zip = new AdmZip('../../AllPrintings.sqlite.zip'),
        [inserts] = zip.getEntries();
  return massageSql(zip.readAsText(inserts));
};

export const uploadCardsToDb = async (): Promise<void> => {
  // TODO: db.query() this
  console.log(unzipSql())
};
