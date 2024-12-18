import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();


const db_host: string = process.env.DB_HOST_NAME || "localhost";
const db_user_name: string = process.env.DB_USER_NAME || "my_username";
const db_password: string = process.env.DB_PASSWORD || "my_password";
const db_database: string = process.env.DB_DATABASE || "my_database";
const db_port: string = process.env.DB_PORT || "my_database";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: db_host,
  port: parseInt(db_port),
  username: db_user_name,
  password: db_password,
  database: db_database,
  synchronize: true, // 개발 환경에서 true 사용 환경에서는 false
  logging: true,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/entities/*.js"
      : "src/entities/*.ts"
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migration/*.js"
      : "src/migration/*.ts"
  ],
  subscribers: [],

});

export default AppDataSource;