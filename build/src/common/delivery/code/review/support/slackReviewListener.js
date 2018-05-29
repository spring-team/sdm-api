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
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
const gitHub_1 = require("@atomist/automation-client/util/gitHub");
const slack = require("@atomist/slack-messages");
/**
 * Route reviews to Slack in linked channels
 */
function slackReviewListener(opts = {}) {
    const paramsToUse = {
        pushReactionResponse: opts.pushReactionResponse,
        deepLink: opts.deepLink || gitHub_1.deepLink,
    };
    return (ri) => __awaiter(this, void 0, void 0, function* () {
        if (ri.review.comments.length > 0) {
            yield sendReviewToSlack("Review comments", ri.review, ri.context, ri.addressChannels, paramsToUse.deepLink);
            return paramsToUse.pushReactionResponse;
        }
    });
}
exports.slackReviewListener = slackReviewListener;
function sendReviewToSlack(title, pr, ctx, addressChannels, deepLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const mesg = {
            text: `*${title} on ${pr.repoId.owner}/${pr.repoId.repo}*`,
            attachments: pr.comments.map(c => reviewCommentToAttachment(pr.repoId, c, deepLink)),
        };
        yield addressChannels(mesg);
        return automation_client_1.Success;
    });
}
function reviewCommentToAttachment(grr, rc, deepLink) {
    const link = rc.sourceLocation ? slack.url(deepLink(grr, rc.sourceLocation), "jump to") :
        slack.url(grr.url + "/tree/" + grr.sha, "source");
    return {
        color: "#ff0000",
        author_name: rc.category,
        author_icon: "https://image.shutterstock.com/z/stock-vector-an-image-of-a-red-grunge-x-572409526.jpg",
        text: `${link} ${rc.detail}`,
        mrkdwn_in: ["text"],
        fallback: "error",
        actions: !!rc.fix ? [
            MessageClient_1.buttonForCommand({ text: "Fix" }, rc.fix.command, rc.fix.params),
        ] : [],
    };
}
//# sourceMappingURL=slackReviewListener.js.map