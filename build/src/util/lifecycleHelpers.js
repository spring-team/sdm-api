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
const slack = require("@atomist/slack-messages/SlackMessages");
const _ = require("lodash");
// This file copied from atomist/lifecycle-automation
/**
 * Safely truncate the first line of a commit message to 50 characters
 * or less.  Only count printable characters, i.e., not link URLs or
 * markup.
 */
function truncateCommitMessage(message, repo) {
    const title = message.split("\n")[0];
    const escapedTitle = slack.escape(title);
    const linkedTitle = linkIssues(escapedTitle, repo);
    if (linkedTitle.length <= 50) {
        return linkedTitle;
    }
    const splitRegExp = /(&(?:[gl]t|amp);|<.*?\||>)/;
    const titleParts = linkedTitle.split(splitRegExp);
    let truncatedTitle = "";
    let addNext = 1;
    let i;
    for (i = 0; i < titleParts.length; i++) {
        let newTitle = truncatedTitle;
        if (i % 2 === 0) {
            newTitle += titleParts[i];
        }
        else if (/^&(?:[gl]t|amp);$/.test(titleParts[i])) {
            newTitle += "&";
        }
        else if (/^<.*\|$/.test(titleParts[i])) {
            addNext = 2;
            continue;
        }
        else if (titleParts[i] === ">") {
            addNext = 1;
            continue;
        }
        if (newTitle.length > 50) {
            const l = 50 - newTitle.length;
            titleParts[i] = titleParts[i].slice(0, l) + "...";
            break;
        }
        truncatedTitle = newTitle;
    }
    return titleParts.slice(0, i + addNext).join("");
}
exports.truncateCommitMessage = truncateCommitMessage;
/**
 * Generate GitHub repository "slug", i.e., owner/repo.
 *
 * @param repo repository with .owner and .name
 * @return owner/name string
 */
function repoSlug(repo) {
    return `${repo.owner}/${repo.name}`;
}
exports.repoSlug = repoSlug;
function htmlUrl(repo) {
    if (repo.org && repo.org.provider && repo.org.provider.url) {
        let providerUrl = repo.org.provider.url;
        if (providerUrl.slice(-1) === "/") {
            providerUrl = providerUrl.slice(0, -1);
        }
        return providerUrl;
    }
    else {
        return "https://github.com";
    }
}
exports.htmlUrl = htmlUrl;
exports.DefaultGitHubApiUrl = "https://api.github.com/";
function apiUrl(repo) {
    if (repo.org && repo.org.provider && repo.org.provider.url) {
        let providerUrl = repo.org.provider.apiUrl;
        if (providerUrl.slice(-1) === "/") {
            providerUrl = providerUrl.slice(0, -1);
        }
        return providerUrl;
    }
    else {
        return exports.DefaultGitHubApiUrl;
    }
}
exports.apiUrl = apiUrl;
function userUrl(repo, login) {
    return `${htmlUrl(repo)}/${login}`;
}
exports.userUrl = userUrl;
function avatarUrl(repo, login) {
    if (repo.org != null && repo.org.provider != null && repo.org.provider.url != null) {
        return `${htmlUrl(repo)}/avatars/${login}`;
    }
    else {
        return `https://avatars.githubusercontent.com/${login}`;
    }
}
exports.avatarUrl = avatarUrl;
function commitUrl(repo, commit) {
    return `${htmlUrl(repo)}/${repoSlug(repo)}/commit/${commit.sha}`;
}
exports.commitUrl = commitUrl;
/**
 * If the URL is of an image, return a Slack message attachment that
 * will render that image.  Otherwise return null.
 *
 * @param url full URL
 * @return Slack message attachment for image or null
 */
function urlToImageAttachment(url) {
    const imageRegExp = /[^\/]+\.(?:png|jpe?g|gif|bmp)$/i;
    const imageMatch = imageRegExp.exec(url);
    if (imageMatch) {
        const image = imageMatch[0];
        return {
            text: image,
            image_url: url,
            fallback: image,
        };
    }
    else {
        return null;
    }
}
/**
 * Find image URLs in a message body, returning an array of Slack
 * message attachments, one for each image.  It expects the message to
 * be in Slack message markup.
 *
 * @param body message body
 * @return array of Slack message Attachments with the `image_url` set
 *         to the URL of the image and the `text` and `fallback` set
 *         to the image name.
 */
function extractImageUrls(body) {
    const slackLinkRegExp = /<(https?:\/\/.*?)(?:\|.*?)?>/g;
    // inspired by https://stackoverflow.com/a/6927878/5464956
    const urlRegExp = /\bhttps?:\/\/[^\s<>\[\]]+[^\s`!()\[\]{};:'".,<>?«»“”‘’]/gi;
    const attachments = [];
    const bodyParts = body.split(slackLinkRegExp);
    for (let i = 0; i < bodyParts.length; i++) {
        if (i % 2 === 0) {
            let match;
            // tslint:disable-next-line:no-conditional-assignment
            while (match = urlRegExp.exec(bodyParts[i])) {
                const url = match[0];
                const attachment = urlToImageAttachment(url);
                if (attachment) {
                    attachments.push(attachment);
                }
            }
        }
        else {
            const url = bodyParts[i];
            const attachment = urlToImageAttachment(url);
            if (attachment) {
                attachments.push(attachment);
            }
        }
    }
    const uniqueAttachments = [];
    attachments.forEach(a => {
        if (!uniqueAttachments.some(ua => ua.image_url === a.image_url)) {
            uniqueAttachments.push(a);
        }
    });
    return uniqueAttachments;
}
exports.extractImageUrls = extractImageUrls;
/**
 * Find issue mentions in body and replace them with links.
 *
 * @param body message to modify
 * @param repo repository information
 * @return string with issue mentions replaced with links
 */
function linkIssues(body, repo) {
    if (!body || body.length === 0) {
        return body;
    }
    const splitter = /(\[.+?\](?:\[.*?\]|\(.+?\)|:\s*http.*)|^```.*\n[\S\s]*?^```\s*\n|<.+?>)/m;
    const bodyParts = body.split(splitter);
    const baseUrl = htmlUrl(repo);
    for (let j = 0; j < bodyParts.length; j += 2) {
        let newPart = bodyParts[j];
        const allIssueMentions = getIssueMentions(newPart);
        allIssueMentions.forEach(i => {
            const iMatchPrefix = (i.indexOf("#") === 0) ? `^|\\W` : repoIssueMatchPrefix;
            const iRegExp = new RegExp(`(${iMatchPrefix})${i}(?!\\w)`, "g");
            const iSlug = (i.indexOf("#") === 0) ? `${repo.owner}/${repo.name}${i}` : i;
            const iUrlPath = iSlug.replace("#", "/issues/");
            const iLink = slack.url(`${baseUrl}/${iUrlPath}`, i);
            newPart = newPart.replace(iRegExp, `\$1${iLink}`);
        });
        bodyParts[j] = newPart;
    }
    return bodyParts.join("");
}
exports.linkIssues = linkIssues;
const gitHubUserMatch = "[a-zA-Z\\d]+(?:-[a-zA-Z\\d]+)*";
/**
 * Regular expression to find issue mentions.  There are capture
 * groups for the issue repository owner, repository name, and issue
 * number.  The capture groups for repository owner and name are
 * optional and therefore may be null, although if one is set, the
 * other should be as well.
 *
 * The rules for preceding characters is different for current repo
 * matches, e.g., "#43", and other repo matches, e.g., "some/repo#44".
 * Current repo matches allow anything but word characters to precede
 * them.  Other repo matches only allow a few other characters to
 * preceed them.
 */
const repoIssueMatchPrefix = "^|[[\\s:({]";
// tslint:disable-next-line:max-line-length
const issueMentionMatch = `(?:^|(?:${repoIssueMatchPrefix})(${gitHubUserMatch})\/(${gitHubUserMatch})|\\W)#([1-9]\\d*)(?!\\w)`;
const issueMentionRegExp = new RegExp(issueMentionMatch, "g");
/**
 * Find all issue mentions and return an array of unique issue
 * mentions as "#3" and "owner/repo#5".
 *
 * @param msg string that may contain mentions
 * @return unique list of issue mentions as #N or O/R#N
 */
function getIssueMentions(msg = "") {
    const allMentions = [];
    let matches;
    // tslint:disable-next-line:no-conditional-assignment
    while (matches = issueMentionRegExp.exec(msg)) {
        const owner = matches[1];
        const repo = matches[2];
        const issue = matches[3];
        const slug = (owner && repo) ? `${owner}/${repo}` : "";
        allMentions.push(`${slug}#${issue}`);
    }
    return _.uniq(allMentions);
}
exports.getIssueMentions = getIssueMentions;
//# sourceMappingURL=lifecycleHelpers.js.map