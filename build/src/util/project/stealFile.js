"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/**
 * Add the downloaded content in the given project
 * @param {string} url url of the content. Must be publicly accessible
 * @param {string} path
 * @return {SimpleProjectEditor}
 */
function stealFile(url, path) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url);
        return p.addFile(path, response.data);
    });
}
exports.stealFile = stealFile;
//# sourceMappingURL=stealFile.js.map