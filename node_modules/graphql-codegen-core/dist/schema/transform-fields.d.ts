import { GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { Field } from '../types';
export declare function resolveFields(schema: GraphQLSchema, rawFields: GraphQLFieldMap<any, any>): Field[];
