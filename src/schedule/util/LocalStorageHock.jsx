//@flow
import React from 'react';
import {ConfigureHock} from 'stampy';
import {Try, Identity} from 'fronads';

function logError(error: Error) {
    console.error(error);
}

function setItem(key: string, data: any): any {
    return () => Identity(data)
        .map(data => JSON.stringify(data))
        .map((dataString) => {
            console.log(data, dataString);
            localStorage.setItem(key, dataString);
            return data;
        })
        .value();
}

function getItem(key: string): any {
    return () => Identity(key)
        .map(data => localStorage.getItem(data))
        .map(data => JSON.parse(data))
        .value();
}

export default ConfigureHock(
    (config) => {
        return (Component) => {
            class LocalStorageHock extends Component {
                constructor(props: Object) {
                    super(props);
                    const {initialState, localStorageKey, constructor} = config(props);
                    const value = Try(getItem(localStorageKey))
                        .leftMap(logError)
                        .map(constructor)
                        .value();

                    this.state = {
                        value: value || initialState
                    };
                }
                onChange: Function = (value: Function) => {
                    const {localStorageKey} = config(this.props);
                    Try(setItem(localStorageKey, value))
                        .map((value) => this.setState({value}))
                        .leftMap(logError);
                }
                render() {
                    const {
                        valueProp,
                        onChangeProp
                    } = config(this.props);

                    const hockProps: Object = {
                        [valueProp]: this.state.value,
                        [onChangeProp]: this.onChange
                    };


                    return <Component
                        {...this.props}
                        {...hockProps}
                    />;
                }
            }

            return LocalStorageHock;
        }
    },
    () => ({
        initialState: undefined,
        constructor: data => data,
        localStorageKey: "LocalStorageHock",
        onChangeProp: 'onChange',
        valueProp: 'value'
    })
);
