import {DbConfig} from '../types/configs';
import {createConnection} from 'mysql';

export class Database {
	connection;

	constructor(mySqlConfig: DbConfig) {
		// TODO: replace with connection pool so we can parallelize uploads
		this.connection = createConnection(mySqlConfig);
		this.connection.connect();
	}

	query(sql: string): Promise<object[]|void> {
		return this.connection.query(sql, (err, results) => {
			if (err) throw err;
			console.log(results[0]);
		});
	}

	close(): Promise<void> {
		return this.connection.end();
	}
}
