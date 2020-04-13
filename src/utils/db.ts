import {createPool, Pool, PoolConfig} from 'mysql';

export class Database {
	public readonly pool: Pool;

	constructor(mySqlConfig: PoolConfig) {
		this.pool = createPool(mySqlConfig);
	}

	query(sql: string): Promise<object[]|void> {
		return new Promise((resolve, reject) => {
			return this.pool.query(sql, (err, results) => {
				if (err) reject(err);
				resolve(results);
			});
		});
	}

	close(): Promise<void> {
		return this.pool.end();
	}
}
