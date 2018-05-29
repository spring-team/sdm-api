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
const archiver = require("archiver");
const fs = require("fs");
class ProjectArchiver {
    constructor(log) {
        this.log = log;
    }
    archive(p, da) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!da.filename) {
                const archiveFile = `${da.cwd}/${da.filename}`;
                this.log.write(`Using archive ${archiveFile}`);
                return fs.createReadStream(archiveFile);
            }
            else {
                return new Promise((resolve, reject) => {
                    this.log.write(`Creating archive for directory ${p.baseDir}`);
                    // tslint:disable-next-line:no-floating-promises
                    this.log.flush();
                    const packageFilePath = p.baseDir + "/cfpackage.zip";
                    const output = fs.createWriteStream(packageFilePath);
                    output.on("close", () => {
                        this.log.write(`Created project archive ${packageFilePath}`);
                        const packageFile = fs.createReadStream(packageFilePath);
                        return resolve(packageFile);
                    });
                    const archive = archiver("zip", {
                        store: true,
                    });
                    archive.pipe(output);
                    archive.directory(p.baseDir, false);
                    archive.on("error", err => {
                        reject(err);
                    });
                    archive.finalize();
                });
            }
        });
    }
}
exports.ProjectArchiver = ProjectArchiver;
//# sourceMappingURL=ProjectArchiver.js.map