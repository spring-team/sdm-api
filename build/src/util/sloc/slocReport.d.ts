import { Project } from "@atomist/automation-client/project/Project";
import { File } from "@atomist/automation-client/project/File";
export interface Language {
    name: string;
    extensions: string[];
}
export interface CodeStats {
    language: Language;
    total: number;
    source: number;
    comment: number;
    single: number;
    block: number;
}
export interface FileReport {
    stats: CodeStats;
    file: File;
}
/**
 * Report about a project's files in a given language
 */
export declare class LanguageReport {
    language: Language;
    fileReports: FileReport[];
    constructor(language: Language, fileReports: FileReport[]);
    /**
     * Return stats for each language
     * @return {CodeStats[]}
     */
    readonly stats: CodeStats;
}
/**
 * Report about lines of code in various languages.
 */
export declare class LanguagesReport {
    languageReports: LanguageReport[];
    constructor(languageReports: LanguageReport[]);
    readonly languagesScanned: Language[];
    /**
     * Return only the found languages
     * @return {CodeStats[]}
     */
    readonly relevantLanguageReports: LanguageReport[];
}
export interface LanguageReportRequest {
    language: Language;
    /**
     * Narrow down search--eg to exclude test
     */
    glob?: string;
}
/**
 * Use the sloc library to compute code statistics
 * @param {Project} p
 * @param {string} request
 * @return {Promise<LanguageReport>}
 */
export declare function reportForLanguage(p: Project, request: LanguageReportRequest): Promise<LanguageReport>;
export declare function reportForLanguages(p: Project, requests?: LanguageReportRequest[]): Promise<LanguagesReport>;
