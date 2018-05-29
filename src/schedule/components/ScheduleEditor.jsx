/* @flow */

import React from 'react';
import {Box} from 'goose-css';
import {Grid} from 'goose-css';
import {Column} from 'goose-css';
import {Text} from 'goose-css';

import Label from 'stampy/lib/component/Label';
import Input from 'stampy/lib/component/Input';
import StepRecord from '../entity/StepRecord';


class ScheduleEditor extends React.Component {
    render(): React.Element<any> {
        const {parcel} = this.props;
        const steps = parcel.get('steps');
        const newStep = {value: new StepRecord()};

        return <div>
            <Label>Name</Label>
            <Input {...parcel.get('name').spread()} />
            <Label>Start Time</Label>
            <Input type="time" {...parcel.get('startTime').spread()} />

            {steps
                .toArray((step, index) => {
                    return <Box modifier="marginTop" key={index}>
                        <Text modifier="strong">Step {index + 1}</Text>
                        <Grid modifier="auto">
                            <Column modifier="always">
                                <Label>Name</Label>
                                <Input {...step.get('name').spread()} />
                            </Column>
                            <Column modifier="always padding">
                                <Label>Offset</Label>
                                <Input {...step.get('offset').spread()} />
                            </Column>
                            <Column modifier="always shrink">
                                <Label>{"\u00A0"}</Label>
                                <button className="Button Button-inline" onClick={() => index === steps.size() -1 ? steps.push(newStep) : steps.insert(index + 1, newStep)}>Add</button>
                                <button className="Button Button-inline" onClick={() => steps.swapPrev(index)}>↑</button>
                                <button className="Button Button-inline" onClick={() => steps.swapNext(index)}>↓</button>
                                <button className="Button Button-inline" onClick={() => steps.delete(index)}>x</button>
                            </Column>
                        </Grid>
                    </Box>;
                })}

            <button className="Button Button-inline" onClick={() => steps.push(newStep)}>New Step</button>



        </div>;
    }
}


export default ScheduleEditor;
