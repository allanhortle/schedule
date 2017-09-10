/* @flow */

import React from 'react';
import Parcel from 'parcels';
import {Box, Grid, Column, Text} from 'obtuse';
import {Label, Input as StampyInput} from 'stampy';
import StepRecord from 'schedule/entity/StepRecord';

function Input(props: Object): React.Element<> {
    const {name, parcel, type = 'text'} = props;
    return <StampyInput type={type} {...parcel.get(name).spread()}/>
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

        return <div>
            <Label>Name</Label>
            <Input name="name" parcel={parcel} />
            <Label>Start Time</Label>
            <Input name="startTime" type="time" parcel={parcel} />


            <button className="Button Button-inline" onClick={() => push(Step())}>New Step</button>

            {steps
                .map((step, index) => {
                    const {swapPrev, swapNext, insert, remove} = listMethods(steps);

                    return <Box className="marginBottom" key={index}>
                        <Text modifier="strong">Step {index + 1}</Text>
                        <Grid modifier="auto">
                            <Column modifier="always">
                                <Label>Name</Label>
                                <Input name="name" parcel={step} />
                            </Column>
                            <Column modifier="always gutter">
                                <Label>Offset</Label>
                                <Input name="offset" parcel={step} />
                            </Column>
                            <Column modifier="always shrink">
                                <Label>{"\u00A0"}</Label>
                                <button className="Button Button-inline" onClick={() => insert(index, Step())}>Add</button>
                                <button className="Button Button-inline" onClick={() => swapPrev(index)}>↑</button>
                                <button className="Button Button-inline" onClick={() => swapNext(index)}>↓</button>
                                <button className="Button Button-inline" onClick={() => remove(index)}>x</button>
                            </Column>
                        </Grid>
                    </Box>;
                })
                .value()}
        </div>;
    }
}


export default ScheduleEditor;
