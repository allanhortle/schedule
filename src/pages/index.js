import React from 'react';
import Link from 'gatsby-link';
import {Text} from 'goose-css';
import getIn from 'unmutable/lib/getIn';

import ScheduleEditor from '../schedule/components/ScheduleEditor';
import ScheduleViewer from '../schedule/components/ScheduleViewer';
import StateHock from 'stampy/lib/hock/StateHock';
import {Map} from 'immutable';
import {IdentityFactory as Identity} from 'fronads';
import {Box} from 'goose-css';
import {Grid} from 'goose-css';
import {Column} from 'goose-css';
import ScheduleRecord from '../schedule/entity/ScheduleRecord';
import LocalStorageHock from '../schedule/util/LocalStorageHock';
import ParcelHock from '../schedule/util/ParcelHock';


const ScheduleViewerWithState = Identity(ScheduleViewer)
    .map(StateHock(() => ({
        initialState: Map({
            day: new Date()
        })
    })))
    .value()


class Index extends React.Component {
    render(): React.Element<any> {
        const {parcel} = this.props;


        return <Box modifier="padding">
            <Grid>
                <Column modifier="4" className="hide-print">
                    <ScheduleEditor parcel={parcel}/>
                </Column>
                <Column modifier="paddingKilo">
                    <ScheduleViewerWithState parcel={parcel}/>
                </Column>
            </Grid>
        </Box>;
    }
}


export default Identity(Index)
    .map(ParcelHock())
    .map(LocalStorageHock({
        localStorageKey: 'schedule',
        initialState: new ScheduleRecord(),
        constructor: value => new ScheduleRecord(value)
    }))
    .value();
