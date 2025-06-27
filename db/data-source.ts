import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //entities: ['dist/**/*.entity{.ts,.js}'],
    entities: [__dirname + '/../**/*.entity.{ts,js}'],

    migrations: ['dist/db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();
export default dataSource;