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
/**
 * Safely mutate the given HandlerContext so that it can respond even when used in
 * an EventHandler
 * @param ctx context to wrap
 * @param destinations
 * @return {HandlerContext}
 */
function teachToRespondInEventHandler(ctx, ...destinations) {
    const oldRespondMethod = ctx.messageClient.respond;
    ctx.messageClient.respond = (msg, options) => __awaiter(this, void 0, void 0, function* () {
        // First try routing to response. If that doesn't work, we're probably
        // in an event handler. Try linked channels.
        try {
            return yield oldRespondMethod(msg, options);
        }
        catch (err) {
            automation_client_1.logger.debug("Rerouting response message to destinations: message was [%s]", msg);
            return ctx.messageClient.send(msg, destinations, options);
        }
    });
    return ctx;
}
exports.teachToRespondInEventHandler = teachToRespondInEventHandler;
//# sourceMappingURL=contextMessageRouting.js.map