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
/**
 * Append the given content to the end of the file at the specified path,
 * creating the file with only this content if it doesn't exist
 * @param {string} content content to append
 * @param {string} path path of the file to append
 * @return {SimpleProjectEditor}
 */
function appendOrCreateFileContent(content, path) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const target = yield p.getFile(path);
        if (!!target) {
            yield target.setContent((yield target.getContent()) + "\n" + content);
        }
        else {
            yield p.addFile(path, content);
        }
        return p;
    });
}
//# sourceMappingURL=appendOrCreate.js.map