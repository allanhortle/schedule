/* @flow */

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AppHandler from 'schedule/components/AppHandler';
import ErrorHandler from 'schedule/components/ErrorHandler';
import MainPage from 'schedule/components/MainPage';


export default (): React.Element<any> => {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route component={ErrorHandler}/>
        </Switch>
    </BrowserRouter>;
};


