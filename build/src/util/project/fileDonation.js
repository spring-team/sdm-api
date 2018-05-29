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
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const automation_client_1 = require("@atomist/automation-client");
/**
 * Add the downloaded content to the given project
 * @param {string} url url of the content. Must be publicly accessible
 * @param {string} path
 * @return {SimpleProjectEditor}
 */
function copyFileFromUrl(url, path) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url);
        return p.addFile(path, response.data);
    });
}
exports.copyFileFromUrl = copyFileFromUrl;
/**
 * Take the specified files from the donor project
 * @param {RemoteRepoRef} donorProjectId
 * @param {FileMapping[]} fileMappings
 * @param {ProjectOperationCredentials} credentials
 * @return {SimpleProjectEditor}
 */
function copyFilesFrom(donorProjectId, fileMappings, credentials) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const donorProject = yield GitCommandGitProject_1.GitCommandGitProject.cloned(credentials, donorProjectId);
        return copyFiles(donorProject, fileMappings)(p);
    });
}
exports.copyFilesFrom = copyFilesFrom;
function copyFiles(donorProject, fileMappings) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        for (const m of fileMappings) {
            const fm = typeof m === "string" ? { donorPath: m, recipientPath: m } : m;
            const found = yield donorProject.getFile(fm.donorPath);
            if (found) {
                yield p.addFile(fm.recipientPath, yield found.getContent());
            }
            else {
                automation_client_1.logger.warn("Path '%s' not found in donor project %s:%s", fm.donorPath, donorProject.id.owner, donorProject.id.repo);
            }
        }
        return p;
    });
}
exports.copyFiles = copyFiles;
//# sourceMappingURL=fileDonation.js.map