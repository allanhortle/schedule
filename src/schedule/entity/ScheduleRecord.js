/* @flow */
import {List} from 'immutable';
import BaseRecord from 'schedule/entity/BaseRecord';
import StepRecord from 'schedule/entity/StepRecord';

export default class ScheduleRecord extends BaseRecord({
    name: null,
    steps: List()
}) {
    constructor(props) {
        super(props);
        return this.update('steps', steps => steps.map(step => new StepRecord(step)))
    }
}
