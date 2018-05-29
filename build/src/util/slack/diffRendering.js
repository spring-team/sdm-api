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
const slack = require("@atomist/slack-messages/SlackMessages");
const ghub_1 = require("../github/ghub");
const lifecycleHelpers_1 = require("../lifecycleHelpers");
/* tslint:disable:no-unused-variable */
function linkToDiff(id, start, end, endDescription) {
    return slack.url(diffUrl(id, start, end), `(Compare with ${endDescription || end.substr(0, 6)})`);
}
exports.linkToDiff = linkToDiff;
function diffUrl(id, start, end) {
    return `${id.url}/compare/${start}...${end}`;
}
function renderDiff(token, id, start, end, color) {
    return __awaiter(this, void 0, void 0, function* () {
        const fromGitHub = yield ghub_1.listCommitsBetween(token, id, start, end);
        const commits = fromGitHub.commits.map(c => ({
            message: c.commit.message,
            sha: c.sha,
            author: c.author,
        }));
        automation_client_1.logger.info("Rendering %d commits in diff", commits.length);
        return render({ owner: id.owner, name: id.repo }, commits, diffUrl(id, start, end), color);
    });
}
exports.renderDiff = renderDiff;
function render(repo, commits, fullDiffLink, color) {
    const commitsGroupedByAuthor = [];
    let author = null;
    let commitsByAuthor = {};
    let unknownCommitter = false;
    for (const commit of commits) {
        const ca = (commit.author != null && commit.author.login && commit.author.login !== ""
            ? commit.author.login : "(unknown)");
        if (ca === "(unknown)") {
            unknownCommitter = true;
        }
        if (author == null || author !== ca) {
            commitsByAuthor = {
                author: ca,
                commits: [],
            };
            author = ca;
            commitsGroupedByAuthor.push(commitsByAuthor);
        }
        if (ca === author) {
            commitsByAuthor.commits.push(commit);
        }
    }
    let attachments = [];
    commitsGroupedByAuthor
        .forEach(cgba => {
        const a = cgba.author;
        const message = cgba.commits.map(c => renderCommitMessage(repo, c)).join("\n");
        const fallback = `lots of commits`;
        const attachment = {
            author_name: `@${a}`,
            author_link: lifecycleHelpers_1.userUrl(repo, a),
            author_icon: lifecycleHelpers_1.avatarUrl(repo, a),
            text: message,
            mrkdwn_in: ["text"],
            color,
            fallback,
            actions: [],
        };
        attachments.push(attachment);
    });
    // Limit number of commits by author to 3
    if (attachments.length > 3) {
        attachments = attachments.slice(0, 3);
        const fullDiffDescription = `... and more! (${commits.length} total commits)`;
        const attachment = {
            title_link: fullDiffLink,
            title: fullDiffDescription,
            color,
            fallback: fullDiffDescription,
            actions: [],
        };
        attachments.push(attachment);
    }
    // if (attachments.length > 0) {
    //     const lastAttachment = attachments[attachments.length - 1];
    //     if (unknownCommitter) {
    //         lastAttachment.footer_icon = "https://images.atomist.com/rug/question.png";
    //         lastAttachment.footer = `Unrecognized author. Please use a known email address to commit.`;
    //     } else {
    //         lastAttachment.footer_icon = "https://images.atomist.com/rug/commit.png";
    //         if (lastAttachment.footer != null) {
    //             lastAttachment.footer = `${url(repoUrl(repo), repoSlug(repo))} - ${lastAttachment.footer}`;
    //         } else {
    //             lastAttachment.footer = url(repoUrl(repo), repoSlug(repo));
    //         }
    //         lastAttachment.ts = Math.floor(Date.parse(push.timestamp) / 1000);
    //     }
    return Promise.resolve(attachments);
}
// exported for testing
function renderCommitMessage(repo, commitNode) {
    // Cut commit to 50 chars of first line
    const m = lifecycleHelpers_1.truncateCommitMessage(commitNode.message, repo);
    return "`" + slack.url(lifecycleHelpers_1.commitUrl(repo, commitNode), commitNode.sha.substring(0, 7)) + "` " + m;
}
exports.renderCommitMessage = renderCommitMessage;
//# sourceMappingURL=diffRendering.js.map