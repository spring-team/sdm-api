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
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const fileCopy_1 = require("../../../src/util/project/fileCopy");
const assert = require("power-assert");
describe("fileDonation", () => {
    it("should copy file from url", () => __awaiter(this, void 0, void 0, function* () {
        const recipient = InMemoryProject_1.InMemoryProject.of();
        yield (fileCopy_1.copyFileFromUrl("https://raw.githubusercontent.com/spring-team/spring-rest-seed/master/pom.xml", "pom.xml"))(recipient);
        assert(!!(yield recipient.getFile("pom.xml")));
    })).timeout(5000);
    it("should copy file from donor project", () => __awaiter(this, void 0, void 0, function* () {
        const donorId = new GitHubRepoRef_1.GitHubRepoRef("spring-team", "spring-rest-seed");
        const filesToSteal = ["pom.xml"];
        const recipient = InMemoryProject_1.InMemoryProject.of();
        yield (fileCopy_1.copyFilesFrom(donorId, filesToSteal, { token: process.env.GITHUB_TOKEN }))(recipient);
        assert(!!(yield recipient.getFile(filesToSteal[0])));
    })).timeout(5000);
    it("should copy file from donor project with mapping", () => __awaiter(this, void 0, void 0, function* () {
        const donorId = new GitHubRepoRef_1.GitHubRepoRef("spring-team", "spring-rest-seed");
        const filesToSteal = [{ donorPath: "pom.xml", recipientPath: "foo" }];
        const recipient = InMemoryProject_1.InMemoryProject.of();
        yield (fileCopy_1.copyFilesFrom(donorId, filesToSteal, { token: process.env.GITHUB_TOKEN }))(recipient);
        assert(!(yield recipient.getFile(filesToSteal[0].donorPath)));
        assert(!!(yield recipient.getFile(filesToSteal[0].recipientPath)));
    })).timeout(5000);
});
//# sourceMappingURL=fileDonationTest.js.map