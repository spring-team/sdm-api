import { Project } from "@atomist/automation-client/project/Project";
import { MatchResult } from "@atomist/automation-client/tree/ast/FileHits";
import { FileParser } from "@atomist/automation-client/tree/ast/FileParser";
import { TreeNode } from "@atomist/tree-path/TreeNode";
/**
 * Request for language elements: For example, function declarations
 */
export interface ElementRequest {
    /**
     * Parser to use to parse the content
     */
    fileParser: FileParser;
    /**
     * Path expression for the elements we want
     */
    pathExpression: string;
    /**
     * Glob patterns for the files we want to parse
     */
    globPattern: string;
    /**
     * Regex to narrow identifier names if specified
     */
    identifierPattern?: RegExp;
    /**
     * Function to extract the identifier from each matched element
     * @param {MatchResult} m
     * @return {string}
     */
    extractIdentifier: (m: MatchResult) => string;
    /**
     * Return a canonical string from this element.
     * Rules will be different for functions, classes etc.
     * Default behavior is C comment removal and whitespace canonicalization
     * @param {TreeNode} n matching node
     * @return {string}
     */
    canonicalize?: (n: TreeNode) => string;
}
/**
 * Request the given elements in a language
 * @param {Project} p
 * @param {Partial<ElementRequest>} opts
 * @return {Promise<Element[]>}
 */
export declare function findElements(p: Project, opts?: Partial<ElementRequest>): Promise<Element[]>;
/**
 * Function signature we've found
 */
export interface Element {
    /**
     * AST node. We can parse further if we wish
     */
    node: TreeNode;
    /**
     * Path of the file within the project
     */
    path: string;
    /**
     * Identifier of the element
     */
    identifier: string;
    body: string;
    /**
     * Canonical body without comments or whitespace.
     * Useful for sha-ing.
     */
    canonicalBody: string;
    /**
     * Sha computed from the canonical body
     */
    sha: string;
}
