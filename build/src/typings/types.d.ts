export declare type Long = any;
export declare enum IssueState {
    open = "open",
    closed = "closed",
}
export declare enum _IssueOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    number_asc = "number_asc",
    number_desc = "number_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    title_asc = "title_asc",
    title_desc = "title_desc",
    body_asc = "body_asc",
    body_desc = "body_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    action_asc = "action_asc",
    action_desc = "action_desc",
    createdAt_asc = "createdAt_asc",
    createdAt_desc = "createdAt_desc",
    updatedAt_asc = "updatedAt_asc",
    updatedAt_desc = "updatedAt_desc",
    closedAt_asc = "closedAt_asc",
    closedAt_desc = "closedAt_desc",
}
export declare enum _RepoOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    owner_asc = "owner_asc",
    owner_desc = "owner_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    allowRebaseMerge_asc = "allowRebaseMerge_asc",
    allowRebaseMerge_desc = "allowRebaseMerge_desc",
    allowSquashMerge_asc = "allowSquashMerge_asc",
    allowSquashMerge_desc = "allowSquashMerge_desc",
    allowMergeCommit_asc = "allowMergeCommit_asc",
    allowMergeCommit_desc = "allowMergeCommit_desc",
    gitHubId_asc = "gitHubId_asc",
    gitHubId_desc = "gitHubId_desc",
    defaultBranch_asc = "defaultBranch_asc",
    defaultBranch_desc = "defaultBranch_desc",
}
export declare enum _LabelOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    default_asc = "default_asc",
    default_desc = "default_desc",
    color_asc = "color_asc",
    color_desc = "color_desc",
}
export declare enum _ChatChannelOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    provider_asc = "provider_asc",
    provider_desc = "provider_desc",
    normalizedName_asc = "normalizedName_asc",
    normalizedName_desc = "normalizedName_desc",
    channelId_asc = "channelId_asc",
    channelId_desc = "channelId_desc",
    isDefault_asc = "isDefault_asc",
    isDefault_desc = "isDefault_desc",
    botInvitedSelf_asc = "botInvitedSelf_asc",
    botInvitedSelf_desc = "botInvitedSelf_desc",
}
export declare enum _ChatIdOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    screenName_asc = "screenName_asc",
    screenName_desc = "screenName_desc",
    userId_asc = "userId_asc",
    userId_desc = "userId_desc",
    provider_asc = "provider_asc",
    provider_desc = "provider_desc",
    isAtomistBot_asc = "isAtomistBot_asc",
    isAtomistBot_desc = "isAtomistBot_desc",
    isOwner_asc = "isOwner_asc",
    isOwner_desc = "isOwner_desc",
    isPrimaryOwner_asc = "isPrimaryOwner_asc",
    isPrimaryOwner_desc = "isPrimaryOwner_desc",
    isAdmin_asc = "isAdmin_asc",
    isAdmin_desc = "isAdmin_desc",
    isBot_asc = "isBot_asc",
    isBot_desc = "isBot_desc",
    timezoneLabel_asc = "timezoneLabel_asc",
    timezoneLabel_desc = "timezoneLabel_desc",
}
export declare enum _EmailOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    address_asc = "address_asc",
    address_desc = "address_desc",
}
export declare enum _GitHubIdOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    login_asc = "login_asc",
    login_desc = "login_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
}
export declare enum ProviderType {
    bitbucket_cloud = "bitbucket_cloud",
    github_com = "github_com",
    ghe = "ghe",
    bitbucket = "bitbucket",
}
export declare enum _GitHubProviderOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    providerId_asc = "providerId_asc",
    providerId_desc = "providerId_desc",
    apiUrl_asc = "apiUrl_asc",
    apiUrl_desc = "apiUrl_desc",
    gitUrl_asc = "gitUrl_asc",
    gitUrl_desc = "gitUrl_desc",
    providerType_asc = "providerType_asc",
    providerType_desc = "providerType_desc",
}
export declare enum _TeamOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    description_asc = "description_asc",
    description_desc = "description_desc",
    iconUrl_asc = "iconUrl_asc",
    iconUrl_desc = "iconUrl_desc",
}
export declare enum _PersonOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    forename_asc = "forename_asc",
    forename_desc = "forename_desc",
    surname_asc = "surname_asc",
    surname_desc = "surname_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
}
export declare enum OwnerType {
    user = "user",
    organization = "organization",
}
export declare enum _OrgOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    owner_asc = "owner_asc",
    owner_desc = "owner_desc",
    ownerType_asc = "ownerType_asc",
    ownerType_desc = "ownerType_desc",
}
export declare enum _SCMProviderOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    providerId_asc = "providerId_asc",
    providerId_desc = "providerId_desc",
    apiUrl_asc = "apiUrl_asc",
    apiUrl_desc = "apiUrl_desc",
    gitUrl_asc = "gitUrl_asc",
    gitUrl_desc = "gitUrl_desc",
    providerType_asc = "providerType_asc",
    providerType_desc = "providerType_desc",
}
export declare enum WebhookType {
    organization = "organization",
    repository = "repository",
}
export declare enum _GitHubOrgWebhookOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    webhookType_asc = "webhookType_asc",
    webhookType_desc = "webhookType_desc",
}
export declare enum _WebhookOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    webhookType_asc = "webhookType_asc",
    webhookType_desc = "webhookType_desc",
}
export declare enum _ChatTeamOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    provider_asc = "provider_asc",
    provider_desc = "provider_desc",
    domain_asc = "domain_asc",
    domain_desc = "domain_desc",
    messageCount_asc = "messageCount_asc",
    messageCount_desc = "messageCount_desc",
    emailDomain_asc = "emailDomain_asc",
    emailDomain_desc = "emailDomain_desc",
}
export declare enum _ChannelLinkOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
}
export declare enum _PullRequestOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    number_asc = "number_asc",
    number_desc = "number_desc",
    prId_asc = "prId_asc",
    prId_desc = "prId_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    body_asc = "body_asc",
    body_desc = "body_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    merged_asc = "merged_asc",
    merged_desc = "merged_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    baseBranchName_asc = "baseBranchName_asc",
    baseBranchName_desc = "baseBranchName_desc",
    branchName_asc = "branchName_asc",
    branchName_desc = "branchName_desc",
    title_asc = "title_asc",
    title_desc = "title_desc",
    createdAt_asc = "createdAt_asc",
    createdAt_desc = "createdAt_desc",
    updatedAt_asc = "updatedAt_asc",
    updatedAt_desc = "updatedAt_desc",
    closedAt_asc = "closedAt_asc",
    closedAt_desc = "closedAt_desc",
    mergedAt_asc = "mergedAt_asc",
    mergedAt_desc = "mergedAt_desc",
}
export declare enum _CommitOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    sha_asc = "sha_asc",
    sha_desc = "sha_desc",
    message_asc = "message_asc",
    message_desc = "message_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum BuildStatus {
    passed = "passed",
    broken = "broken",
    failed = "failed",
    started = "started",
    canceled = "canceled",
}
export declare enum BuildTrigger {
    pull_request = "pull_request",
    push = "push",
    tag = "tag",
    cron = "cron",
}
export declare enum _BuildOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    buildId_asc = "buildId_asc",
    buildId_desc = "buildId_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    status_asc = "status_asc",
    status_desc = "status_desc",
    buildUrl_asc = "buildUrl_asc",
    buildUrl_desc = "buildUrl_desc",
    compareUrl_asc = "compareUrl_asc",
    compareUrl_desc = "compareUrl_desc",
    trigger_asc = "trigger_asc",
    trigger_desc = "trigger_desc",
    provider_asc = "provider_asc",
    provider_desc = "provider_desc",
    pullRequestNumber_asc = "pullRequestNumber_asc",
    pullRequestNumber_desc = "pullRequestNumber_desc",
    startedAt_asc = "startedAt_asc",
    startedAt_desc = "startedAt_desc",
    finishedAt_asc = "finishedAt_asc",
    finishedAt_desc = "finishedAt_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    workflowId_asc = "workflowId_asc",
    workflowId_desc = "workflowId_desc",
    jobName_asc = "jobName_asc",
    jobName_desc = "jobName_desc",
    jobId_asc = "jobId_asc",
    jobId_desc = "jobId_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _PushOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    branch_asc = "branch_asc",
    branch_desc = "branch_desc",
}
export declare enum _TagOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    description_asc = "description_asc",
    description_desc = "description_desc",
    ref_asc = "ref_asc",
    ref_desc = "ref_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _ReleaseOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _DockerImageOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    image_asc = "image_asc",
    image_desc = "image_desc",
    imageName_asc = "imageName_asc",
    imageName_desc = "imageName_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _K8PodOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    phase_asc = "phase_asc",
    phase_desc = "phase_desc",
    environment_asc = "environment_asc",
    environment_desc = "environment_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    baseName_asc = "baseName_asc",
    baseName_desc = "baseName_desc",
    namespace_asc = "namespace_asc",
    namespace_desc = "namespace_desc",
    statusJSON_asc = "statusJSON_asc",
    statusJSON_desc = "statusJSON_desc",
    host_asc = "host_asc",
    host_desc = "host_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    specsJSON_asc = "specsJSON_asc",
    specsJSON_desc = "specsJSON_desc",
    envJSON_asc = "envJSON_asc",
    envJSON_desc = "envJSON_desc",
    metadataJSON_asc = "metadataJSON_asc",
    metadataJSON_desc = "metadataJSON_desc",
    resourceVersion_asc = "resourceVersion_asc",
    resourceVersion_desc = "resourceVersion_desc",
}
export declare enum _K8ContainerOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    imageName_asc = "imageName_asc",
    imageName_desc = "imageName_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    environment_asc = "environment_asc",
    environment_desc = "environment_desc",
    containerJSON_asc = "containerJSON_asc",
    containerJSON_desc = "containerJSON_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    ready_asc = "ready_asc",
    ready_desc = "ready_desc",
    restartCount_asc = "restartCount_asc",
    restartCount_desc = "restartCount_desc",
    statusJSON_asc = "statusJSON_asc",
    statusJSON_desc = "statusJSON_desc",
    resourceVersion_asc = "resourceVersion_asc",
    resourceVersion_desc = "resourceVersion_desc",
    containerID_asc = "containerID_asc",
    containerID_desc = "containerID_desc",
}
export declare enum _SpinnakerPipelineOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    executionId_asc = "executionId_asc",
    executionId_desc = "executionId_desc",
    application_asc = "application_asc",
    application_desc = "application_desc",
    eventType_asc = "eventType_asc",
    eventType_desc = "eventType_desc",
    taskName_asc = "taskName_asc",
    taskName_desc = "taskName_desc",
    stageName_asc = "stageName_asc",
    stageName_desc = "stageName_desc",
    stageType_asc = "stageType_asc",
    stageType_desc = "stageType_desc",
    waitingForJudgement_asc = "waitingForJudgement_asc",
    waitingForJudgement_desc = "waitingForJudgement_desc",
}
export declare enum _SpinnakerStageOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    type_asc = "type_asc",
    type_desc = "type_desc",
    status_asc = "status_asc",
    status_desc = "status_desc",
    startTime_asc = "startTime_asc",
    startTime_desc = "startTime_desc",
    endTime_asc = "endTime_asc",
    endTime_desc = "endTime_desc",
    refId_asc = "refId_asc",
    refId_desc = "refId_desc",
}
export declare enum _WorkflowOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    workflowId_asc = "workflowId_asc",
    workflowId_desc = "workflowId_desc",
    provider_asc = "provider_asc",
    provider_desc = "provider_desc",
    config_asc = "config_asc",
    config_desc = "config_desc",
}
export declare enum StatusState {
    pending = "pending",
    success = "success",
    error = "error",
    failure = "failure",
}
export declare enum _StatusOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    description_asc = "description_asc",
    description_desc = "description_desc",
    targetUrl_asc = "targetUrl_asc",
    targetUrl_desc = "targetUrl_desc",
    context_asc = "context_asc",
    context_desc = "context_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _HerokuAppOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    app_asc = "app_asc",
    app_desc = "app_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    user_asc = "user_asc",
    user_desc = "user_desc",
    appId_asc = "appId_asc",
    appId_desc = "appId_desc",
    release_asc = "release_asc",
    release_desc = "release_desc",
}
export declare enum _ApplicationOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    host_asc = "host_asc",
    host_desc = "host_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    domain_asc = "domain_asc",
    domain_desc = "domain_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _FingerprintOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    sha_asc = "sha_asc",
    sha_desc = "sha_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _ParentImpactOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _BranchOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum ReviewState {
    requested = "requested",
    pending = "pending",
    approved = "approved",
    commented = "commented",
    changes_requested = "changes_requested",
}
export declare enum _ReviewOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    gitHubId_asc = "gitHubId_asc",
    gitHubId_desc = "gitHubId_desc",
    body_asc = "body_asc",
    body_desc = "body_desc",
    state_asc = "state_asc",
    state_desc = "state_desc",
    submittedAt_asc = "submittedAt_asc",
    submittedAt_desc = "submittedAt_desc",
    htmlUrl_asc = "htmlUrl_asc",
    htmlUrl_desc = "htmlUrl_desc",
}
export declare enum CommentCommentType {
    review = "review",
    pullRequest = "pullRequest",
    issue = "issue",
}
export declare enum _CommentOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    body_asc = "body_asc",
    body_desc = "body_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
    gitHubId_asc = "gitHubId_asc",
    gitHubId_desc = "gitHubId_desc",
    path_asc = "path_asc",
    path_desc = "path_desc",
    position_asc = "position_asc",
    position_desc = "position_desc",
    htmlUrl_asc = "htmlUrl_asc",
    htmlUrl_desc = "htmlUrl_desc",
    commentType_asc = "commentType_asc",
    commentType_desc = "commentType_desc",
}
export declare enum _DeletedBranchOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    name_asc = "name_asc",
    name_desc = "name_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _ImageLinkedOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    timestamp_asc = "timestamp_asc",
    timestamp_desc = "timestamp_desc",
}
export declare enum _PushImpactOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _PullRequestImpactOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
    url_asc = "url_asc",
    url_desc = "url_desc",
    data_asc = "data_asc",
    data_desc = "data_desc",
}
export declare enum _UserJoinedChannelOrdering {
    atmTeamId_asc = "atmTeamId_asc",
    atmTeamId_desc = "atmTeamId_desc",
    id_asc = "id_asc",
    id_desc = "id_desc",
}
export declare enum _Ordering {
    desc = "desc",
    asc = "asc",
}
export declare namespace BuildUrlBySha {
    type Variables = {
        sha: string;
    };
    type Query = {
        __typename?: "Query";
        Commit?: Commit[] | null;
    };
    type Commit = {
        __typename?: "Commit";
        builds?: Builds[] | null;
    };
    type Builds = {
        __typename?: "Build";
        status?: BuildStatus | null;
        buildUrl?: string | null;
        timestamp?: string | null;
    };
}
export declare namespace CommitForSdmGoal {
    type Variables = {
        sha: string;
        repo: string;
        owner: string;
        branch: string;
    };
    type Query = {
        __typename?: "Query";
        Commit?: Commit[] | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        statuses?: Statuses[] | null;
        repo?: Repo | null;
        pushes?: Pushes[] | null;
        image?: Image | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Pushes = PushFields.Fragment;
    type Image = {
        __typename?: "DockerImage";
        image?: string | null;
        imageName?: string | null;
    };
}
export declare namespace LastEndpoint {
    type Variables = {
        name: string;
        owner: string;
        branch: string;
        statusContext: string;
    };
    type Query = {
        __typename?: "Query";
        Repo?: Repo[] | null;
    };
    type Repo = {
        __typename?: "Repo";
        branches?: Branches[] | null;
    };
    type Branches = {
        __typename?: "Branch";
        commit?: Commit | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        statuses?: Statuses[] | null;
        pushes?: Pushes[] | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
    type Pushes = {
        __typename?: "Push";
        id?: string | null;
    };
}
export declare namespace PersonByChatId {
    type Variables = {
        screenName: string;
    };
    type Query = {
        __typename?: "Query";
        ChatId?: ChatId[] | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        userId?: string | null;
        screenName?: string | null;
        person?: Person | null;
    };
    type Person = PersonFields.Fragment;
}
export declare namespace PullRequestForSha {
    type Variables = {
        owner: string;
        repo: string;
        sha: string;
    };
    type Query = {
        __typename?: "Query";
        PullRequest?: PullRequest[] | null;
    };
    type PullRequest = {
        __typename?: "PullRequest";
        name?: string | null;
        title?: string | null;
        body?: string | null;
        id?: string | null;
        number?: number | null;
        author?: Author | null;
        repo?: Repo | null;
        head?: Head | null;
        base?: Base | null;
    };
    type Author = {
        __typename?: "GitHubId";
        person?: Person | null;
    };
    type Person = {
        __typename?: "Person";
        chatId?: ChatId | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Head = {
        __typename?: "Commit";
        message?: string | null;
    };
    type Base = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
}
export declare namespace PushForCommit {
    type Variables = {
        sha: string;
        repo: string;
        owner: string;
        providerId: string;
        branch: string;
    };
    type Query = {
        __typename?: "Query";
        Commit?: Commit[] | null;
    };
    type Commit = {
        __typename?: "Commit";
        pushes?: Pushes[] | null;
        repo?: Repo | null;
    };
    type Pushes = PushFields.Fragment;
    type Repo = {
        __typename?: "Repo";
        org?: Org | null;
    };
    type Org = {
        __typename?: "Org";
        provider?: Provider | null;
    };
    type Provider = {
        __typename?: "GitHubProvider";
        providerId?: string | null;
    };
}
export declare namespace RepoBranchTips {
    type Variables = {
        name: string;
        owner: string;
    };
    type Query = {
        __typename?: "Query";
        Repo?: Repo[] | null;
    };
    type Repo = {
        __typename?: "Repo";
        owner?: string | null;
        org?: Org | null;
        defaultBranch?: string | null;
        branches?: Branches[] | null;
    };
    type Org = {
        __typename?: "Org";
        provider?: Provider | null;
    };
    type Provider = {
        __typename?: "GitHubProvider";
        providerId?: string | null;
    };
    type Branches = {
        __typename?: "Branch";
        name?: string | null;
        commit?: Commit | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
    };
}
export declare namespace ReposInTeam {
    type Variables = {
        teamId: string;
        offset: number;
    };
    type Query = {
        __typename?: "Query";
        ChatTeam?: ChatTeam[] | null;
    };
    type ChatTeam = {
        __typename?: "ChatTeam";
        orgs?: Orgs[] | null;
    };
    type Orgs = {
        __typename?: "Org";
        repo?: Repo[] | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace ScmProvider {
    type Variables = {
        providerId: string;
    };
    type Query = {
        __typename?: "Query";
        SCMProvider?: ScmProvider[] | null;
    };
    type ScmProvider = {
        __typename?: "SCMProvider";
        providerType?: ProviderType | null;
        url?: string | null;
        providerId?: string | null;
        apiUrl?: string | null;
    };
}
export declare namespace SdmBuildIdentifierForRepo {
    type Variables = {
        owner?: string[] | null;
        name?: string[] | null;
        providerId?: string[] | null;
    };
    type Query = {
        __typename?: "Query";
        SdmBuildIdentifier?: SdmBuildIdentifier[] | null;
    };
    type SdmBuildIdentifier = {
        __typename?: "SdmBuildIdentifier";
        identifier?: string | null;
        id?: string | null;
        repo?: Repo | null;
    };
    type Repo = {
        __typename?: "SdmBuildIdentifierRepository";
        name?: string | null;
        owner?: string | null;
        providerId?: string | null;
    };
}
export declare namespace SdmGoalById {
    type Variables = {
        id: string;
    };
    type Query = {
        __typename?: "Query";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace SdmGoalsForCommit {
    type Variables = {
        sha: string;
        branch?: string | null;
        repo: string;
        owner: string;
        providerId: string;
        qty: number;
    };
    type Query = {
        __typename?: "Query";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = {
        __typename?: "SdmGoal";
        repo?: Repo | null;
    } & SdmGoalFields.Fragment;
    type Repo = {
        __typename?: "SdmRepository";
        name?: string | null;
        owner?: string | null;
        providerId?: string | null;
    };
}
export declare namespace SdmVersionForCommit {
    type Variables = {
        sha?: string[] | null;
        branch?: string[] | null;
        name?: string[] | null;
        owner?: string[] | null;
        providerId?: string[] | null;
    };
    type Query = {
        __typename?: "Query";
        SdmVersion?: SdmVersion[] | null;
    };
    type SdmVersion = {
        __typename?: "SdmVersion";
        repo?: Repo | null;
        version?: string | null;
    };
    type Repo = {
        __typename?: "SdmVersionRepository";
        name?: string | null;
        owner?: string | null;
        providerId?: string | null;
    };
}
export declare namespace WhatIsRunning {
    type Variables = {
        domain?: string | null;
    };
    type Query = {
        __typename?: "Query";
        Application?: Application[] | null;
    };
    type Application = {
        __typename?: "Application";
        domain?: string | null;
        commits?: Commits[] | null;
    };
    type Commits = {
        __typename?: "Commit";
        sha?: string | null;
        repo?: Repo | null;
    };
    type Repo = {
        __typename?: "Repo";
        owner?: string | null;
        name?: string | null;
    };
}
export declare namespace OnAnyCompletedSdmGoal {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnAnyFailedSdmGoal {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnAnyGoal {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnAnyPendingStatus {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = StatusForExecuteGoal.Fragment;
}
export declare namespace OnAnyRequestedSdmGoal {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = {
        __typename?: "SdmGoal";
        id?: string | null;
    } & SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnAnySuccessfulSdmGoal {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnAnySuccessStatus {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = StatusForExecuteGoal.Fragment;
}
export declare namespace OnAParticularStatus {
    type Variables = {
        context: string;
    };
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = {
        __typename?: "Status";
        commit?: Commit | null;
        state?: StatusState | null;
        targetUrl?: string | null;
        context?: string | null;
        description?: string | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        statuses?: Statuses[] | null;
        repo?: Repo | null;
        pushes?: Pushes[] | null;
        image?: Image | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Pushes = {
        __typename?: "Push";
        branch?: string | null;
    };
    type Image = {
        __typename?: "DockerImage";
        image?: string | null;
        imageName?: string | null;
    };
}
export declare namespace OnBuildComplete {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Build?: Build[] | null;
    };
    type Build = {
        __typename?: "Build";
        buildId?: string | null;
        buildUrl?: string | null;
        compareUrl?: string | null;
        name?: string | null;
        status?: BuildStatus | null;
        jobId?: string | null;
        startedAt?: string | null;
        timestamp?: string | null;
        push?: Push | null;
        commit?: Commit | null;
    };
    type Push = PushFields.Fragment;
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        timestamp?: string | null;
        repo?: Repo | null;
        statuses?: Statuses[] | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
}
export declare namespace OnBuildCompleteForDryRun {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Build?: Build[] | null;
    };
    type Build = {
        __typename?: "Build";
        buildId?: string | null;
        buildUrl?: string | null;
        compareUrl?: string | null;
        name?: string | null;
        status?: BuildStatus | null;
        commit?: Commit | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        repo?: Repo | null;
        pushes?: Pushes[] | null;
        statuses?: Statuses[] | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Pushes = {
        __typename?: "Push";
        branch?: string | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
}
export declare namespace OnChannelLink {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        ChannelLink?: ChannelLink[] | null;
    };
    type ChannelLink = {
        __typename?: "ChannelLink";
        repo?: Repo | null;
        channel?: Channel | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Channel = {
        __typename?: "ChatChannel";
        team?: Team | null;
        name?: string | null;
        id?: string | null;
    };
    type Team = {
        __typename?: "ChatTeam";
        id?: string | null;
    };
}
export declare namespace OnClosedIssue {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Issue?: Issue[] | null;
    };
    type Issue = {
        __typename?: "Issue";
        number?: number | null;
        title?: string | null;
        body?: string | null;
        openedBy?: OpenedBy | null;
        closedBy?: ClosedBy | null;
        createdAt?: string | null;
        updatedAt?: string | null;
        repo: Repo;
        assignees?: Assignees[] | null;
    };
    type OpenedBy = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: Person | null;
    };
    type Person = PersonFields.Fragment;
    type ClosedBy = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: _Person | null;
    };
    type _Person = PersonFields.Fragment;
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Assignees = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: __Person | null;
    };
    type __Person = PersonFields.Fragment;
}
export declare namespace OnDeployToProductionFingerprint {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Fingerprint?: Fingerprint[] | null;
    };
    type Fingerprint = {
        __typename?: "Fingerprint";
        name?: string | null;
        commit?: Commit | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        author?: Author | null;
        image?: Image | null;
        statuses?: Statuses[] | null;
        repo?: Repo | null;
    };
    type Author = {
        __typename?: "GitHubId";
        person?: Person | null;
    };
    type Person = {
        __typename?: "Person";
        id?: string | null;
        name?: string | null;
        chatId?: ChatId | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
    type Image = {
        __typename?: "DockerImage";
        imageName?: string | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnFailureStatus {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = StatusForExecuteGoal.Fragment;
}
export declare namespace OnFirstPushToRepo {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Push?: Push[] | null;
    };
    type Push = PushFields.Fragment;
}
export declare namespace OnImageLinked {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        ImageLinked?: ImageLinked[] | null;
    };
    type ImageLinked = {
        __typename?: "ImageLinked";
        commit?: Commit | null;
        image?: Image | null;
    };
    type Commit = {
        __typename?: "Commit";
        pushes?: Pushes[] | null;
        sha?: string | null;
        message?: string | null;
        author?: Author | null;
        repo?: Repo | null;
        statuses?: Statuses[] | null;
    };
    type Pushes = PushFields.Fragment;
    type Author = {
        __typename?: "GitHubId";
        person?: Person | null;
    };
    type Person = {
        __typename?: "Person";
        id?: string | null;
        name?: string | null;
        chatId?: ChatId | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
    };
    type Image = {
        __typename?: "DockerImage";
        image?: string | null;
        imageName?: string | null;
    };
}
export declare namespace OnIssueAction {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Issue?: Issue[] | null;
    };
    type Issue = {
        __typename?: "Issue";
        number?: number | null;
        title?: string | null;
        state?: IssueState | null;
        body?: string | null;
        openedBy?: OpenedBy | null;
        createdAt?: string | null;
        updatedAt?: string | null;
        repo: Repo;
        assignees?: Assignees[] | null;
    };
    type OpenedBy = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: Person | null;
    };
    type Person = PersonFields.Fragment;
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Assignees = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: _Person | null;
    };
    type _Person = PersonFields.Fragment;
}
export declare namespace OnPendingStatus {
    type Variables = {
        context: string;
    };
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = StatusForExecuteGoal.Fragment;
}
export declare namespace OnPullRequest {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        PullRequest?: PullRequest[] | null;
    };
    type PullRequest = {
        __typename?: "PullRequest";
        title?: string | null;
        number?: number | null;
        body?: string | null;
        id?: string | null;
        base?: Base | null;
        head?: Head | null;
        repo?: _Repo | null;
    };
    type Base = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type Head = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        pushes?: Pushes[] | null;
    };
    type Pushes = {
        __typename?: "Push";
        before?: Before | null;
        commits?: Commits[] | null;
        branch?: string | null;
        id?: string | null;
        repo?: Repo | null;
    };
    type Before = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type Commits = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type _Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnPush {
    type Variables = {
        branch: string;
    };
    type Subscription = {
        __typename?: "Subscription";
        Push?: Push[] | null;
    };
    type Push = {
        __typename?: "Push";
        id?: string | null;
        repo?: Repo | null;
        commits?: Commits[] | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Commits = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        author?: Author | null;
    };
    type Author = {
        __typename?: "GitHubId";
        _id?: Long | null;
        login?: string | null;
        name?: string | null;
        person?: Person | null;
    };
    type Person = {
        __typename?: "Person";
        chatId?: ChatId | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
}
export declare namespace OnPushImpact {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        PushImpact?: PushImpact[] | null;
    };
    type PushImpact = {
        __typename?: "PushImpact";
        id?: string | null;
        data?: string | null;
        push?: Push | null;
    };
    type Push = {
        __typename?: "Push";
        before?: Before | null;
        after?: After | null;
    };
    type Before = {
        __typename?: "Commit";
        sha?: string | null;
        fingerprints?: Fingerprints[] | null;
    };
    type Fingerprints = {
        __typename?: "Fingerprint";
        sha?: string | null;
        name?: string | null;
        data?: string | null;
    };
    type After = {
        __typename?: "Commit";
        author?: Author | null;
        sha?: string | null;
        fingerprints?: _Fingerprints[] | null;
        repo?: Repo | null;
    };
    type Author = {
        __typename?: "GitHubId";
        login?: string | null;
        emails?: Emails[] | null;
    };
    type Emails = {
        __typename?: "Email";
        address?: string | null;
    };
    type _Fingerprints = {
        __typename?: "Fingerprint";
        sha?: string | null;
        name?: string | null;
        data?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnPushToAnyBranch {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Push?: Push[] | null;
    };
    type Push = PushFields.Fragment;
}
export declare namespace OnPushWithBefore {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Push?: Push[] | null;
    };
    type Push = {
        __typename?: "Push";
        id?: string | null;
        branch?: string | null;
        before?: Before | null;
        after?: After | null;
        repo?: Repo | null;
    };
    type Before = {
        __typename?: "Commit";
        message?: string | null;
        sha?: string | null;
        statuses?: Statuses[] | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        state?: StatusState | null;
        description?: string | null;
    };
    type After = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnRepoCreation {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Repo?: Repo[] | null;
    };
    type Repo = {
        __typename?: "Repo";
        owner?: string | null;
        name?: string | null;
        id?: string | null;
    };
}
export declare namespace OnRepoOnboarded {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        RepoOnboarded?: RepoOnboarded[] | null;
    };
    type RepoOnboarded = {
        __typename?: "RepoOnboarded";
        repo: Repo;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnRequestedSdmGoal {
    type Variables = {
        goalName: string;
        environment: string;
    };
    type Subscription = {
        __typename?: "Subscription";
        SdmGoal?: SdmGoal[] | null;
    };
    type SdmGoal = SdmGoalFields.Fragment & SdmGoalRepo.Fragment;
}
export declare namespace OnSuccessStatus {
    type Variables = {
        context: string;
    };
    type Subscription = {
        __typename?: "Subscription";
        Status?: Status[] | null;
    };
    type Status = {
        __typename?: "Status";
        commit?: Commit | null;
        state?: StatusState | null;
        targetUrl?: string | null;
        context?: string | null;
        description?: string | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        statuses?: Statuses[] | null;
        repo?: Repo | null;
        pushes?: Pushes[] | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Pushes = {
        __typename?: "Push";
        branch?: string | null;
    };
}
export declare namespace OnTag {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        Tag?: Tag[] | null;
    };
    type Tag = {
        __typename?: "Tag";
        id?: string | null;
        name?: string | null;
        description?: string | null;
        timestamp?: string | null;
        release?: Release | null;
        commit?: Commit | null;
    };
    type Release = {
        __typename?: "Release";
        name?: string | null;
        id?: string | null;
        timestamp?: string | null;
    };
    type Commit = {
        __typename?: "Commit";
        repo?: Repo | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace OnUserJoiningChannel {
    type Variables = {};
    type Subscription = {
        __typename?: "Subscription";
        UserJoinedChannel?: UserJoinedChannel[] | null;
    };
    type UserJoinedChannel = {
        __typename?: "UserJoinedChannel";
        user?: User | null;
        channel?: Channel | null;
    };
    type User = {
        __typename?: "ChatId";
        screenName?: string | null;
        person?: Person | null;
    };
    type Person = PersonFields.Fragment;
    type Channel = {
        __typename?: "ChatChannel";
        name?: string | null;
        repos?: Repos[] | null;
    };
    type Repos = CoreRepoFieldsAndChannels.Fragment;
}
export declare namespace CoreCommitFields {
    type Fragment = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        timestamp?: string | null;
        committer?: Committer | null;
    };
    type Committer = {
        __typename?: "GitHubId";
        person?: Person | null;
    };
    type Person = {
        __typename?: "Person";
        chatId?: ChatId | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
}
export declare namespace CoreRepoFieldsAndChannels {
    type Fragment = {
        __typename?: "Repo";
        owner?: string | null;
        name?: string | null;
        org?: Org | null;
        channels?: Channels[] | null;
        defaultBranch?: string | null;
    };
    type Org = {
        __typename?: "Org";
        owner?: string | null;
        ownerType?: OwnerType | null;
        provider?: Provider | null;
    };
    type Provider = {
        __typename?: "GitHubProvider";
        providerId?: string | null;
        providerType?: ProviderType | null;
        apiUrl?: string | null;
        url?: string | null;
    };
    type Channels = {
        __typename?: "ChatChannel";
        team?: Team | null;
        name?: string | null;
        id?: string | null;
    };
    type Team = {
        __typename?: "ChatTeam";
        id?: string | null;
    };
}
export declare namespace PersonFields {
    type Fragment = {
        __typename?: "Person";
        forename?: string | null;
        surname?: string | null;
        name?: string | null;
        emails?: Emails[] | null;
        gitHubId?: GitHubId | null;
        chatId?: ChatId | null;
    };
    type Emails = {
        __typename?: "Email";
        address?: string | null;
    };
    type GitHubId = {
        __typename?: "GitHubId";
        login?: string | null;
    };
    type ChatId = {
        __typename?: "ChatId";
        screenName?: string | null;
    };
}
export declare namespace PushFields {
    type Fragment = {
        __typename?: "Push";
        id?: string | null;
        timestamp?: string | null;
        branch?: string | null;
        before?: Before | null;
        after?: After | null;
        repo?: Repo | null;
        commits?: Commits[] | null;
    };
    type Before = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        committer?: Committer | null;
    };
    type Committer = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: Person | null;
    };
    type Person = PersonFields.Fragment;
    type After = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        committer?: _Committer | null;
    };
    type _Committer = {
        __typename?: "GitHubId";
        login?: string | null;
        person?: _Person | null;
    };
    type _Person = PersonFields.Fragment;
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Commits = {
        __typename?: "Commit";
        sha?: string | null;
        timestamp?: string | null;
        message?: string | null;
        author?: Author | null;
    };
    type Author = {
        __typename?: "GitHubId";
        _id?: Long | null;
        login?: string | null;
        name?: string | null;
    };
}
export declare namespace SdmGoalFields {
    type Fragment = {
        __typename?: "SdmGoal";
        environment?: string | null;
        uniqueName?: string | null;
        name?: string | null;
        sha?: string | null;
        branch?: string | null;
        fulfillment?: Fulfillment | null;
        description?: string | null;
        url?: string | null;
        state?: string | null;
        externalKey?: string | null;
        goalSet?: string | null;
        goalSetId?: string | null;
        ts?: number | null;
        error?: string | null;
        retryFeasible?: boolean | null;
        preConditions?: PreConditions[] | null;
        approval?: Approval | null;
        provenance?: Provenance[] | null;
        data?: string | null;
    };
    type Fulfillment = {
        __typename?: "SdmGoalFulfillment";
        method?: string | null;
        name?: string | null;
    };
    type PreConditions = {
        __typename?: "SdmCondition";
        environment?: string | null;
        name?: string | null;
    };
    type Approval = {
        __typename?: "SdmProvenance";
        correlationId?: string | null;
        registration?: string | null;
        name?: string | null;
        version?: string | null;
        ts?: number | null;
        userId?: string | null;
        channelId?: string | null;
    };
    type Provenance = {
        __typename?: "SdmProvenance";
        correlationId?: string | null;
        registration?: string | null;
        name?: string | null;
        version?: string | null;
        ts?: number | null;
        userId?: string | null;
        channelId?: string | null;
    };
}
export declare namespace SdmGoalRepo {
    type Fragment = {
        __typename?: "SdmGoal";
        repo?: Repo | null;
    };
    type Repo = {
        __typename?: "SdmRepository";
        name?: string | null;
        owner?: string | null;
        providerId?: string | null;
    };
}
export declare namespace StatusForExecuteGoal {
    type Fragment = {
        __typename?: "Status";
        commit?: Commit | null;
        state?: StatusState | null;
        targetUrl?: string | null;
        context?: string | null;
        description?: string | null;
    };
    type Commit = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
        statuses?: Statuses[] | null;
        repo?: Repo | null;
        pushes?: Pushes[] | null;
        image?: Image | null;
    };
    type Statuses = {
        __typename?: "Status";
        context?: string | null;
        description?: string | null;
        state?: StatusState | null;
        targetUrl?: string | null;
    };
    type Repo = CoreRepoFieldsAndChannels.Fragment;
    type Pushes = {
        __typename?: "Push";
        before?: Before | null;
        commits?: Commits[] | null;
        branch?: string | null;
        id?: string | null;
        repo?: _Repo | null;
    };
    type Before = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type Commits = {
        __typename?: "Commit";
        sha?: string | null;
        message?: string | null;
    };
    type _Repo = CoreRepoFieldsAndChannels.Fragment;
    type Image = {
        __typename?: "DockerImage";
        image?: string | null;
        imageName?: string | null;
    };
}
