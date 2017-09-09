/* @flow */

import React from 'react';
import Parcel from 'parcels';
import Obtuse, {Box, Grid, Column} from 'obtuse';
import {Label, Input as StampyInput} from 'stampy';
import StepRecord from 'schedule/entity/StepRecord';

function Input(props: Object): React.Element<> {
    const {name, parcel} = props;
    return <StampyInput {...parcel.get(name).spread()}/>
}

function Step(props: Object): StepRecord {
    return new StepRecord(props);
}

function listMethods(parcel: Object): Object {
    const value = parcel.value();
    const onChange = parcel.onChange;

    const swap = (aa, bb) => onChange(value.set(aa, value.get(bb)).set(bb, value.get(aa)));
    return {
        push: (data) => onChange(value.push(data)),
        pop: (data) => onChange(value.pop()),
        shift: (data) => onChange(value.shift()),
        unshift: (data) => onChange(value.unshift(data)),
        insert: (index, data) => onChange(value.insert(index + 1, data)),
        remove: (index) => onChange(value.delete(index)),
        swapPrev: index => swap(index, index - 1),
        swapNext: index => swap(index, index + 1)
    }
}

class ScheduleEditor extends React.Component {
    render(): React.Element<any> {
        const {value, onChange} = this.props;
        const parcel = Parcel(value, (value) => onChange(value));

        const steps = parcel.get('steps');

        const {push, pop, shift, unshift, swap} = listMethods(steps);

        console.log(steps);
        return <div>
            ScheduleEditor

            <Label>Name</Label>
            <Input name="name" parcel={parcel} />


            <button className="Button Button-inline" onClick={() => push(Step())}>Push</button>
            <button className="Button Button-inline" onClick={() => pop()}>Pop</button>
            <button className="Button Button-inline" onClick={() => shift()}>Shift</button>
            <button className="Button Button-inline" onClick={() => unshift(Step())}>Unshift</button>
            <button className="Button Button-inline" onClick={() => swap(0, 1)}>Swap 0 and 1</button>

            {steps
                .map((step, index) => {
                    const {swapPrev, swapNext, insert, remove} = listMethods(steps);

                    return <Box modifier="padding" key={index}>
                        <label className="Label">Step {index + 1}</label>
                        <Grid modifier="auto">
                            <Column modifier="always gutter">
                                <Label>Name</Label>
                                <Input name="name" parcel={step} />
                            </Column>
                            <Column modifier="always gutter">
                                <Label>Offset</Label>
                                <Input name="offset" parcel={step} />
                            </Column>
                            <Column modifier="always gutter shrink">
                                <Label>{"\u00A0"}</Label>
                                <button className="Button Button-inline" onClick={() => swapPrev(index)}>Prev</button>
                                <button className="Button Button-inline" onClick={() => swapNext(index)}>Next</button>
                                <button className="Button Button-inline" onClick={() => insert(index, Step())}>Insert</button>
                                <button className="Button Button-inline" onClick={() => remove(index)}>Delete</button>
                            </Column>
                        </Grid>
                    </Box>;
                })
                .value()}
        </div>;
    }
}


export default ScheduleEditor;
