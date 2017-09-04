/* @flow */

// A fix for style-loader issue #96, #55, #124
if(process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    __webpack_public_path__ = window.location.protocol + "//" + window.location.host + "/";
    /* eslint-enable */
}

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppHandler from 'schedule/components/AppHandler';


import {EntityStore} from './entity/EntityApi';

// Needs to be required rather than imported for above fix to work
require('schedule/sass/styles.scss');

ReactDOM.render(
    <Provider store={EntityStore}><AppHandler/></Provider>,
    document.getElementById('schedule')
);


