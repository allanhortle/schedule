/* @flow */

import {combineReducers} from 'redux';
import {createEntityReducer} from 'enty';
import EntitySchema from 'schedule/entity/EntitySchema';
import EntityConstructor from 'schedule/entity/EntityConstructor';

export default combineReducers({
    entity: createEntityReducer({
        schemaMap: {
            ENTITY_RECEIVE: EntitySchema
        },
        afterNormalize: EntityConstructor
    })
});

