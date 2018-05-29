import { GraphQLInputType, GraphQLOutputType, GraphQLType } from 'graphql';
export interface ResolvedType {
    name: string;
    isRequired: boolean;
    isArray: boolean;
}
export declare function isRequired(type: GraphQLOutputType | GraphQLInputType): boolean;
export declare function isArray(type: GraphQLOutputType | GraphQLInputType): boolean;
export declare function resolveType(type: GraphQLType): ResolvedType;
