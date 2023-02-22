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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const database_1 = require("../../database");
const videos_1 = require("../../models/videos");
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS videos (
      video_id BIGSERIAL NOT NULL PRIMARY KEY,
      video_title VARCHAR(150) NOT NULL,
      video_description VARCHAR(500) NOT NULL,
      video_url VARCHAR(100) NOT NULL,
      video_thumbnail_url VARCHAR(100) NOT NULL
    )`;
    yield (0, database_1.fetch)(createTableQuery);
});
const insertMockData = () => __awaiter(void 0, void 0, void 0, function* () {
    const checkDataQuery = `SELECT EXISTS(SELECT 1 FROM videos)`;
    const rows = yield (0, database_1.fetch)(checkDataQuery);
    if (!rows[0].exists) {
        const insertQuery = `INSERT INTO videos (video_title, video_description, video_url, video_thumbnail_url)
                             VALUES ($1, $2, $3, $4)`;
        for (const data of (0, videos_1.getVideos)()) {
            yield (0, database_1.fetch)(insertQuery, [data.title, data.description, data.url, data.thumbnailUrl]);
        }
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTable();
    yield insertMockData();
    const query = `SELECT * FROM videos LIMIT $1`;
    const result = yield (0, database_1.fetch)(query, [100]);
    return result;
});
exports.getAll = getAll;
//# sourceMappingURL=index.js.map