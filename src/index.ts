import {downloadCardSql} from './cardImporter/downloader';
import {uploadCardsToDb} from './cardImporter/uploader';

export const populateDb = async () => {
	try {
		await downloadCardSql();
		await uploadCardsToDb();
	} catch(err) {
		console.error(err);
	}
};

// TODO: db-migrate up codex-metadata
