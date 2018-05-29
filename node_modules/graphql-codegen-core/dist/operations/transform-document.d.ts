import { DocumentNode, GraphQLSchema } from 'graphql';
import { Document } from '../types';
export declare function transformDocument(schema: GraphQLSchema, documentNode: DocumentNode): Document;
