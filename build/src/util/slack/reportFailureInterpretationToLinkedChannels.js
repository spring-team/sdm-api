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
function reportFailureInterpretationToLinkedChannels(stepName, interpretation, fullLog, id, addressChannels, retryButton) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interpretation) {
            if (fullLog.url) {
                automation_client_1.logger.info("No log interpretation. Log available at: " + fullLog.url);
                return;
            }
            automation_client_1.logger.info("No log interpretation, no log URL. Sending full log to Slack");
            yield addressChannels({
                content: fullLog.log,
                fileType: "text",
                fileName: `${stepName}-failure-${id.sha}.log`,
            });
            return;
        }
        yield addressChannels({
            text: `Failed ${stepName} of ${slack.url(`${id.url}/tree/${id.sha}`, id.sha.substr(0, 7))}`,
            attachments: [{
                    title: interpretation.message || "Failure",
                    title_link: fullLog.url,
                    fallback: "relevant bits",
                    text: interpretation.relevantPart,
                    color: "#ff5050",
                    actions: retryButton ? [retryButton] : [],
                }],
        });
        const includeFullLogByDefault = !fullLog.url; // if there is no link, include it by default
        const shouldIncludeFullLog = "includeFullLog" in interpretation ? interpretation.includeFullLog : includeFullLogByDefault;
        if (shouldIncludeFullLog) {
            automation_client_1.logger.debug("sending full log to slack. url is %s, includeFullLog is %s", fullLog.url, interpretation.includeFullLog);
            yield addressChannels({
                content: fullLog.log,
                fileType: "text",
                fileName: `${stepName}-failure-${id.sha}.log`,
            });
        }
    });
}
exports.reportFailureInterpretationToLinkedChannels = reportFailureInterpretationToLinkedChannels;
//# sourceMappingURL=reportFailureInterpretationToLinkedChannels.js.map