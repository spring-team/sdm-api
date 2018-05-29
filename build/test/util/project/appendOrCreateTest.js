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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const appendOrCreate_1 = require("../../../src/util/project/appendOrCreate");
describe("appendOrCreate", () => {
    it("should create if doesn't exist", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of();
        yield appendOrCreate_1.appendOrCreateFileContent("content", "Thing1")(p);
        const f = yield p.getFile("Thing1");
        assert(!!f, "File should have been created");
        assert.equal(f.getContentSync(), "content");
    }));
    it("should append if does exist", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of({ path: "Thing1", content: "dogs" });
        yield appendOrCreate_1.appendOrCreateFileContent("content", "Thing1")(p);
        const f = yield p.getFile("Thing1");
        assert(!!f, "File should still exist");
        assert.equal(f.getContentSync(), "dogscontent");
    }));
});
//# sourceMappingURL=appendOrCreateTest.js.map