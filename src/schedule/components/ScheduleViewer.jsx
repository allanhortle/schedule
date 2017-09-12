/* @flow */

import React from 'react';
import Parcel from 'parcels';
import Moment from 'moment';
import {Box, Grid, Column} from 'obtuse';
import {Perhaps} from 'fronads';
import {Label, Input as StampyInput} from 'stampy';
import StepRecord from 'schedule/entity/StepRecord';

import DayPicker from 'react-day-picker';


class ScheduleEditor extends React.Component {
    render(): React.Element<any> {
        const {value, onChange, schedule} = this.props;
        const [hour, minute] = schedule.startTime.split(':');
        const dateMap = schedule.getDateMap(Moment(value.get('day')).hour(hour).minute(minute));

        function renderDay(day) {
            const date = Moment(day);

            return <div>
                {date.date()}
                {Perhaps(dateMap.get(date.format('YYYY-MM-DD')))
                    .map((list) => {
                        return list.map((item, key) => <div key={key}>{item.date.format('HH:mm')} {item.name}</div>);
                    })
                    .value()}

            </div>;
        }

        return <div>
            <Button onClick={() => console.log(schedule.toIcal())}>Download</Button>
            <DayPicker
                enableOutsideDays
                renderDay={renderDay}
                onDayClick={day => onChange(value.set('day', day))}
            />
        </div>;
    }
}


export default ScheduleEditor;
