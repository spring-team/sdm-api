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
class ReviewerError extends Error {
    constructor(reviewerName, msg, stderr) {
        super(msg);
        this.reviewerName = reviewerName;
        this.stderr = stderr;
    }
}
exports.ReviewerError = ReviewerError;
function formatReviewerError(err) {
    // I'd like to include a reference to the commit here
    const attachment = {
        color: "#bd4024",
        fallback: err.message,
        text: err.message,
        title: err.reviewerName + " failed to run",
    };
    return { attachments: [attachment] };
}
exports.formatReviewerError = formatReviewerError;
//# sourceMappingURL=ReviewerError.js.map