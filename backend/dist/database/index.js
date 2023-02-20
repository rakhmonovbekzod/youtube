var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: 'postgres',
    password: '19951212bek',
    database: 'youtube',
    port: 5432,
    host: 'localhost',
});
const fetch = (SQL, params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    console.log('Connected to database');
    try {
        const { rows } = yield client.query(SQL, params);
        return rows;
    }
    catch (e) {
        console.log(e);
        return [];
    }
    finally {
        client.release();
        console.log('Disconnected from database');
    }
});
export { fetch };
//# sourceMappingURL=index.js.map