/* @flow */

import {EntityApi} from 'enty';
import ApplicationSchema from './ApplicationSchema';
import request from '../util/request';


const Api = EntityApi(ApplicationSchema, {
    core: (data) => Promise.resolve(data)
});

export const {
    EntityStore,
    CoreQueryHock,
    CoreMutationHock,
} = Api;
