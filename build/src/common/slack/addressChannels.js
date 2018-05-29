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
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
/**
 * Throw away contents. Use when we know that there can be no linked channels.
 * @constructor
 */
exports.AddressNoChannels = () => __awaiter(this, void 0, void 0, function* () { return undefined; });
/**
 * Address the chat channels associated with this object.
 * Typically used to address channels associated with a repo.
 * @param {HasChannels} hasChannels
 * @param {HandlerContext} ctx
 * @return {AddressChannels}
 */
function addressChannelsFor(hasChannels, ctx) {
    if (hasChannels.channels && hasChannels.channels.length > 0) {
        return addressDestinations(ctx, ...messageDestinationsFor(hasChannels, ctx));
    }
    else {
        return () => Promise.resolve();
    }
}
exports.addressChannelsFor = addressChannelsFor;
function messageDestinationsFor(hasChannels, ctx) {
    return hasChannels.channels.map(ch => MessageClient_1.addressSlackChannels(ch.team.id, ch.name));
}
exports.messageDestinationsFor = messageDestinationsFor;
function addressDestinations(ctx, ...destinations) {
    return (msg, opts) => ctx.messageClient.send(msg, destinations, opts);
}
exports.addressDestinations = addressDestinations;
//# sourceMappingURL=addressChannels.js.map