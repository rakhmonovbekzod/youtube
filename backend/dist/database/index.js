"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: 'postgres',
    password: '19951212bek',
    database: 'youtube',
    port: 5432,
    host: 'localhost',
});
const fetch = (SQL, params = []) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.fetch = fetch;
//# sourceMappingURL=index.js.map