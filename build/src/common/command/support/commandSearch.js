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
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@atomist/automation-client/internal/metadata/metadata");
const constructionUtils_1 = require("@atomist/automation-client/util/constructionUtils");
/**
 * Return command handlers with a given tag.
 * Note this may not find all, but it will find those that know their
 * own metadata, which is true of all those returned by generatorHandler
 * and the underlying commandHandlerFrom
 * @param {FunctionalUnit} unit
 * @param {string} tag
 */
function commandHandlersWithTag(unit, tag) {
    return selfDescribingHandlers(unit)
        .filter(hi => hi.instance.tags.some(t => t.name === tag));
}
exports.commandHandlersWithTag = commandHandlersWithTag;
/**
 * Return command handlers along with their metadata
 * Note this may not find all, but it will find those that know their
 * own metadata
 * @param {FunctionalUnit} unit
 */
function selfDescribingHandlers(unit) {
    return unit.commandHandlers
        .map(maker => ({ maker, instance: constructionUtils_1.toFactory(maker)() }))
        .filter(hi => metadata_1.isCommandHandlerMetadata(hi.instance));
}
exports.selfDescribingHandlers = selfDescribingHandlers;
//# sourceMappingURL=commandSearch.js.map