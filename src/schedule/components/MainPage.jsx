/* @flow */

import React from 'react';
import ScheduleEditor from './ScheduleEditor';
import {StateHock} from 'stampy';
import {Identity} from 'fronads';
import ScheduleRecord from 'schedule/entity/ScheduleRecord';
import LocalStorageHock from 'schedule/util/LocalStorageHock';


class MainPage extends React.Component {
    render(): React.Element<any> {
        const {onChange, value} = this.props;
        return <div>
            Schedule
            <ScheduleEditor value={value} onChange={onChange}/>
        </div>;
    }
}


export default Identity(MainPage)
    .map(LocalStorageHock(() => ({
        localStorageKey: 'schedule',
        initialState: new ScheduleRecord()
    })))
    .value();
