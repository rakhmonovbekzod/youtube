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
const singleVideo_1 = require("../../controllers/singleVideo");
const videos_1 = require("../../controllers/videos");
const router = express_1.default.Router();
router.get('/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, videos_1.getAll)();
    res.send(data);
}));
router.get('/videos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = yield (0, singleVideo_1.getSingleVideo)(id);
    res.send(data);
}));
exports.default = router;
//# sourceMappingURL=index.js.map