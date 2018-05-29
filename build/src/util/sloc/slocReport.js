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
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const _ = require("lodash");
const sloc = require("sloc");
const languages_1 = require("./languages");
/**
 * Report about a project's files in a given language
 */
class LanguageReport {
    constructor(language, fileReports) {
        this.language = language;
        this.fileReports = fileReports;
    }
    /**
     * Return stats for each language
     * @return {CodeStats[]}
     */
    get stats() {
        return {
            language: this.language,
            total: _.sum(this.fileReports.map(r => r.stats.total)),
            source: _.sum(this.fileReports.map(r => r.stats.source)),
            comment: _.sum(this.fileReports.map(r => r.stats.comment)),
            single: _.sum(this.fileReports.map(r => r.stats.single)),
            block: _.sum(this.fileReports.map(r => r.stats.block)),
        };
    }
}
exports.LanguageReport = LanguageReport;
/**
 * Report about lines of code in various languages.
 */
class LanguagesReport {
    constructor(languageReports) {
        this.languageReports = languageReports;
    }
    get languagesScanned() {
        return _.uniq(this.languageReports.map(lr => lr.language));
    }
    /**
     * Return only the found languages
     * @return {CodeStats[]}
     */
    get relevantLanguageReports() {
        return this.languageReports.filter(lr => lr.stats.total > 0);
    }
}
exports.LanguagesReport = LanguagesReport;
/**
 * Use the sloc library to compute code statistics
 * @param {Project} p
 * @param {string} request
 * @return {Promise<LanguageReport>}
 */
function reportForLanguage(p, request) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.language.extensions.length > 1) {
            throw new Error("Only one extension supported in " + JSON.stringify(request.language));
        }
        const extension = request.language.extensions[0];
        const globToUse = request.glob || `**/*.${extension}`;
        const fileReports = yield projectUtils_1.saveFromFilesAsync(p, globToUse, (f) => __awaiter(this, void 0, void 0, function* () {
            const content = yield f.getContent();
            const stats = sloc(content, extension);
            return {
                stats,
                file: f,
                language: request.language,
            };
        }));
        return new LanguageReport(request.language, fileReports);
    });
}
exports.reportForLanguage = reportForLanguage;
function reportForLanguages(p, requests = languages_1.AllLanguages.map(language => ({ language }))) {
    return __awaiter(this, void 0, void 0, function* () {
        const languageReports = yield Promise.all(requests.map(r => reportForLanguage(p, r)));
        return new LanguagesReport(languageReports);
    });
}
exports.reportForLanguages = reportForLanguages;
//# sourceMappingURL=slocReport.js.map