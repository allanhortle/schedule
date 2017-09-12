/* @flow */
import {List, Map} from 'immutable';
import Moment from 'moment';
import BaseRecord from 'schedule/entity/BaseRecord';
import StepRecord from 'schedule/entity/StepRecord';
import Ical from 'ical-generator';

// /(\d*)([dhms])/g

export default class ScheduleRecord extends BaseRecord({
    name: null,
    startTime: "00:00",
    steps: List()
}) {
    constructor(props) {
        super(props);
        return this.update('steps', steps => steps.map(step => new StepRecord(step)))
    }
    getDateMap(startDate: Date) {
        return this.steps
            .map((step) => {
                const momentStep = step
                    .offset
                    .match(/(\d*)([dhms])/g)
                    .reduce((rr, time) => {
                        const [all, value, unit] = time.match(/(\d*)([dhms])/);
                        rr[unit] = value;
                        return rr;
                    }, {})

                return step
                    .set('momentOffset', momentStep);
            })
            .update((steps) => {
                return steps.reduce((rr, value, index) => {
                    const nextDate = Moment(rr.get('dateCount')).add(value.get('momentOffset'));
                    return rr
                        .set('dateCount', nextDate)
                        .setIn(['steps', index, 'date'], nextDate);

                    return value.set('date', date.add(value.get('momentOffset')).format('YYYY-MM-DD'));
                }, Map({dateCount: Moment(startDate), steps}))
                .get('steps');

            })
            .groupBy(ii => ii.get('date').format('YYYY-MM-DD'))
    }
    toIcal() {
        const events = this.steps
            .map(step => ({
                start: date,
                summary: name,
                timestamp: date
            }))
            .toArray();

        return ical({events}).toString();
    }
}
