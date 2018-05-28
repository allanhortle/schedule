/* @flow */

import React from 'react';
import Moment from 'moment';
import {Box} from 'goose-css';
import {Grid} from 'goose-css';
import {Column} from 'goose-css';
import {Perhaps} from 'fronads';
import Label from 'stampy/lib/component/Label';
import Button from 'stampy/lib/component/Label';
import StampyInput from 'stampy/lib/component/Input';
import StepRecord from '../entity/StepRecord';
import {Table} from 'goose-css';
import {TableBody} from 'goose-css';
import {TableRow} from 'goose-css';
import {TableCell} from 'goose-css';
import {TableHead} from 'goose-css';
import {TableHeadCell} from 'goose-css';

import DayPicker from 'react-day-picker';


class ScheduleEditor extends React.Component {
    render(): React.Element<any> {
        const {parcel} = this.props;
        const schedule = parcel.value();
        const [hour, minute] = schedule.startTime.split(':');
        const dateMap = schedule.getDateMap(Moment(schedule.get('day')).hour(hour).minute(minute));

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
            <h1>{schedule.name}</h1>
            <DayPicker
                enableOutsideDays
                renderDay={renderDay}
                onDayClick={parcel.get('day').onChange}
            />

            <Box modifier="marginTopKilo">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Step</TableHeadCell>
                            <TableHeadCell>Date</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dateMap
                            .entrySeq()
                            .sortBy(([date]) => date)
                            .flatMap(([date, list]) => list)
                            .map((step, key) => {
                                const {name} = step;
                                const {date} = step;

                                return <TableRow>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{Perhaps(date)
                                        .map(date => date.format('YYYY-MM-DD HH:mm'))
                                        .value('start')}</TableCell>
                                </TableRow>
                            })}
                    </TableBody>
                </Table>
            </Box>
        </div>;
    }
}


export default ScheduleEditor;
