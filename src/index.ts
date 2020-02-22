import {downloadCardSql} from './cardImporter/downloader';
import {uploadCardsToDb} from './cardImporter/uploader';

(async () => {
	try {
		await downloadCardSql();
		await uploadCardsToDb();
	} catch(err) {
		console.error(err);
	}
})();
