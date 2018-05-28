//@flow
import React from 'react';
import Hock from 'stampy/lib/util/Hock';
import {Try, IdentityFactory} from 'fronads';

function logError(error: Error) {
    console.error(error);
}

function setItem(key: string, data: any): any {
    return () => IdentityFactory(data)
        .map(data => JSON.stringify(data))
        .map((dataString) => {
            localStorage.setItem(key, dataString);
            return data;
        })
        .value();
}

function getItem(key: string): any {
    return () => IdentityFactory(key)
        .map(data => localStorage.getItem(data))
        .map(data => JSON.parse(data))
        .value();
}

export default Hock({
    hock: (config) => {
        return (Component) => {
            class LocalStorageHock extends Component {
                constructor(props: Object) {
                    super(props);
                    const {initialState, localStorageKey, constructor} = config;
                    const value = Try(getItem(localStorageKey))
                        .leftMap(logError)
                        .map(constructor)
                        .value();

                    this.state = {
                        value: value || initialState
                    };
                }
                onChange: Function = (value: Function) => {
                    const {localStorageKey} = config;
                    Try(setItem(localStorageKey, value))
                        .map((value) => this.setState({value}))
                        .leftMap(logError);
                }
                render() {
                    const {
                        valueProp,
                        onChangeProp
                    } = config;

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
    defaultConfig: {
        initialState: undefined,
        constructor: data => data,
        localStorageKey: "LocalStorageHock",
        onChangeProp: 'onChange',
        valueProp: 'value'
    }
});
