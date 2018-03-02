import { HttpLink } from 'apollo-link-http';
import {split} from 'apollo-client-preset'
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities'
import * as ws from 'ws';
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client';

import fetch from 'node-fetch';
import {introspectSchema, makeRemoteExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from "graphql";


export const getRemoteSchema =  async (uri: String, subUri: String): Promise<GraphQLSchema> => {
    const httpLink = new HttpLink({ uri, fetch });
    const wsLink = new SubscriptionClient(subUri,{
        reconnect: true
    }, ws);

    const link = split(
        ({query}) => {
            const {kind, operation} = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink,
    );
    const schema = await introspectSchema(httpLink);

    const executableSchema = makeRemoteExecutableSchema({
        schema,
        link,
    });
    return executableSchema;
}
