/* @flow */

import {EntityApi} from 'enty';
import ApplicationSchema from './ApplicationSchema';
import request from '../util/request';


const Api = EntityApi(ApplicationSchema, {
    core: () => request.get('/hortles.json').then(payload => ({tree: payload.data}))
});

export const {
    EntityStore,
    CoreQueryHock,
    CoreMutationHock,
} = Api;
