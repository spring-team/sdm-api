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
const string_1 = require("@atomist/automation-client/internal/util/string");
const slack_messages_1 = require("@atomist/slack-messages");
const base64 = require("../misc/base64");
function success(title, text, actions) {
    const msg = {
        attachments: [{
                author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${string_1.guid()}`,
                author_name: title,
                text,
                fallback: text,
                color: "#45B254",
                mrkdwn_in: ["text"],
                actions,
            }],
    };
    return msg;
}
exports.success = success;
function warning(title, text, ctx, actions) {
    const msg = {
        attachments: [{
                author_icon: `https://images.atomist.com/rug/warning-yellow.png`,
                author_name: title,
                text,
                fallback: text,
                color: "#ffcc00",
                mrkdwn_in: ["text"],
                footer: supportLink(ctx),
                actions,
            }],
    };
    return msg;
}
exports.warning = warning;
function error(title, text, ctx, actions) {
    const msg = {
        attachments: [{
                author_icon: "https://images.atomist.com/rug/error-circle.png",
                author_name: title,
                text,
                fallback: text,
                color: "#D94649",
                mrkdwn_in: ["text"],
                footer: supportLink(ctx),
                actions,
            }],
    };
    return msg;
}
exports.error = error;
function supportLink(ctx) {
    const supportUrl = `https://atomist.typeform.com/to/yvnyOj?message_id=${base64.encode(ctx.invocationId)}`;
    return `${slack_messages_1.url(supportUrl, "Support")}`;
}
exports.supportLink = supportLink;
//# sourceMappingURL=messages.js.map