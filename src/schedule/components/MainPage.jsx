/* @flow */

import React from 'react';
import ScheduleEditor from 'schedule/components/ScheduleEditor';
import ScheduleViewer from 'schedule/components/ScheduleViewer';
import {StateHock} from 'stampy';
import {Map} from 'immutable';
import {Identity} from 'fronads';
import {Grid, Column, Box} from 'obtuse';
import ScheduleRecord from 'schedule/entity/ScheduleRecord';
import LocalStorageHock from 'schedule/util/LocalStorageHock';


const ScheduleViewerWithState = Identity(ScheduleViewer)
    .map(StateHock(() => ({
        initialState: Map({
            day: new Date()
        })
    })))
    .value()




class MainPage extends React.Component {
    render(): React.Element<any> {
        const {onChange, value} = this.props;


        return <Box modifier="padding">
            Schedule
            <Grid>
                <Column modifier="4">
                    <ScheduleEditor value={value} onChange={onChange}/>
                </Column>
                <Column modifier="gutter">
                    <ScheduleViewerWithState schedule={value} onChange={onChange}/>
                </Column>
            </Grid>
        </Box>;
    }
}


export default Identity(MainPage)
    .map(LocalStorageHock(() => ({
        localStorageKey: 'schedule',
        initialState: new ScheduleRecord(),
        constructor: value => new ScheduleRecord(value)
    })))
    .value();
