"use strict";
/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const retry_1 = require("@atomist/automation-client/util/retry");
const GitHubApi = require("@octokit/rest");
const axios_1 = require("axios");
const fs = require("fs");
const p = require("path");
const tmp = require("tmp-promise");
const URL = require("url");
const util_1 = require("util");
const toToken_1 = require("../../../util/credentials/toToken");
const ghub_1 = require("../../../util/github/ghub");
/**
 * Implement ArtifactStore interface to store artifacts as GitHub releases
 */
class GitHubReleaseArtifactStore {
    storeFile(appInfo, localFile, creds) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = toToken_1.toToken(creds);
            const tagName = appInfo.version + new Date().getMilliseconds();
            const tag = {
                tag: tagName,
                message: appInfo.version + " for release",
                object: appInfo.id.sha,
                type: "commit",
                tagger: {
                    name: "Atomist",
                    email: "info@atomist.com",
                    date: new Date().toISOString(),
                },
            };
            const grr = appInfo.id;
            yield ghub_1.createTag(token, grr, tag);
            const release = {
                name: appInfo.version,
                tag_name: tag.tag,
            };
            yield ghub_1.createRelease(token, grr, release);
            const asset = yield uploadAsset(token, grr.owner, grr.repo, tag.tag, localFile);
            automation_client_1.logger.info("Uploaded artifact with url [%s] for %j", asset.browser_download_url, appInfo);
            return asset.browser_download_url;
        });
    }
    // TODO this is Maven specific
    // Name is of format fintan-0.1.0-SNAPSHOT.jar
    checkout(url, id, creds) {
        return __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info("Attempting to download artifact [%s] for %j", url, id);
            const tmpDir = tmp.dirSync({ unsafeCleanup: true });
            const cwd = tmpDir.name;
            const lastSlash = url.lastIndexOf("/");
            const filename = url.substring(lastSlash + 1);
            const re = /([a-zA-Z0-9_]+)-(.*)/;
            const match = re.exec(filename);
            const name = match[1];
            const version = match[2].replace(/.jar$/, "");
            const outputPath = cwd + "/" + filename;
            automation_client_1.logger.info("Attempting to download url %s to %s", url, outputPath);
            yield downloadFileAs(creds, url, outputPath);
            automation_client_1.logger.info("Successfully download url %s to %s", url, outputPath);
            return {
                cwd,
                filename,
                name,
                version,
                id,
            };
        });
    }
}
exports.GitHubReleaseArtifactStore = GitHubReleaseArtifactStore;
/**
 * Download the file to local disk
 * @param creds credentials
 * @param {string} url
 * @param {string} outputFilename
 * @return {Promise<any>}
 */
function downloadFileAs(creds, url, outputFilename) {
    const token = toToken_1.toToken(creds);
    return retry_1.doWithRetry(() => axios_1.default.get(url, Object.assign({}, ghub_1.authHeaders(token), { headers: {
            "Accept": "application/octet-stream",
            "Content-Type": "application/zip",
        }, responseType: "arraybuffer" })), `Download ${url} to ${outputFilename}`, {
        minTimeout: 10000,
        maxTimeout: 10100,
        retries: 10,
    })
        .then(result => {
        return fs.writeFileSync(outputFilename, result.data);
    });
}
function uploadAsset(token, owner, repo, tag, path, contentType = "application/zip") {
    const github = githubApi(token);
    return github.repos.getReleaseByTag({
        owner,
        repo,
        tag,
    })
        .then((result) => __awaiter(this, void 0, void 0, function* () {
        const file = (yield util_1.promisify(fs.readFile)(path)).buffer;
        const contentLength = (yield util_1.promisify(fs.stat)(path)).size;
        return github.repos.uploadAsset({
            url: result.data.upload_url,
            file,
            contentType,
            contentLength,
            name: p.basename(path),
        });
    }))
        .then(r => r.data);
}
exports.uploadAsset = uploadAsset;
function githubApi(token, apiUrl = "https://api.github.com/") {
    // separate the url
    const url = URL.parse(apiUrl);
    const gitHubApi = new GitHubApi({
        host: url.hostname,
        protocol: url.protocol.slice(0, -1),
        port: +url.port,
    });
    gitHubApi.authenticate({ type: "token", token });
    return gitHubApi;
}
exports.githubApi = githubApi;
//# sourceMappingURL=GitHubReleaseArtifactStore.js.map