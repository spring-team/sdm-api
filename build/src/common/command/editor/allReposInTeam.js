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
const localRepoFinder_1 = require("@atomist/automation-client/operations/common/localRepoFinder");
const _ = require("lodash");
const repoRef_1 = require("../../../util/git/repoRef");
// Hard-coded limit in GraphQL queries. Not sure why we can't pass this
const PageSize = 100;
/**
 * Use a GraphQL query to find all repos for the current team,
 * or look locally if appropriate, in current working directory
 * @param cwd directory to look in if this is local
 * @constructor
 */
function allReposInTeam(cwd) {
    return (context) => {
        if (cwd) {
            return localRepoFinder_1.twoTierDirectoryRepoFinder(cwd)(context);
        }
        return queryForPage(context, 0);
    };
}
exports.allReposInTeam = allReposInTeam;
/**
 * Recursively query for repos from the present offset
 * @param {HandlerContext} context
 * @param {number} offset
 * @return {Promise<RepoRef[]>}
 */
function queryForPage(context, offset) {
    return context.graphClient.query({
        name: "ReposInTeam",
        variables: { teamId: context.teamId, offset },
    })
        .then(result => {
        return _.flatMap(result.ChatTeam[0].orgs, org => org.repo.map(r => repoRef_1.toRemoteRepoRef(r, {})));
    })
        .then(repos => {
        return (repos.length < PageSize) ?
            repos :
            queryForPage(context, offset + PageSize)
                .then(moreRepos => repos.concat(moreRepos));
    });
}
//# sourceMappingURL=allReposInTeam.js.map