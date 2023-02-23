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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const videos_1 = require("./models/videos");
const web_push_1 = __importDefault(require("web-push"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const privateKey = 'Z8ZaHigAwokRYYq-qUuGpw2k40l88N2ut9kfc0C35M8';
const publicKey = 'BC2khsugf7WFea_kfGzXAHOwuiJw-rsTjSrSyTp1PlvPcbIGXgC-37785t22oIvQNIx5RLIT_ZDkzd-_5-doM5w';
const corsOptions = {
    origin: '*'
};
web_push_1.default.setVapidDetails('mailto:bekzodrakhmonov1995@gmail.com', publicKey, privateKey);
let globalsubscription = null;
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post("/register", (req, res, next) => {
    let subscription = req.body;
    globalsubscription = subscription === null || subscription === void 0 ? void 0 : subscription.subscription;
    res.send(JSON.stringify(subscription));
});
app.delete("/register", (req, res, next) => {
    globalsubscription = null;
    res.sendStatus(200).send('successfully deleted');
});
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../assets')));
// API routes
app.use(routes_1.default);
// Start the server
const port = 4000;
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
let testData = {
    title: "Testing",
    body: 'this is a test',
    icon: null,
    x: undefined
};
if (globalsubscription) {
    web_push_1.default.sendNotification(globalsubscription, JSON.stringify(testData)).catch(() => { });
}
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTable();
    yield insertMockData();
    console.log(`Server is listening on port ${port}`);
}));
//# sourceMappingURL=server.js.map