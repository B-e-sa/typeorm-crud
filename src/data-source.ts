import { Photo } from './entity/Photo';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { PhotoMetadata } from './entity/PhotoMetadata';

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "database",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});