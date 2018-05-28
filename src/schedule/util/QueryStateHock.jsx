// @flow
import React from 'react';
import type {Element} from 'react';
import Hock from 'stampy/lib/util/Hock';
import Parcel from 'proto-parcels';
import QueryStringHock from 'stampy/lib/hock/QueryStringHock';

const toBase64 = value => btoa(JSON.stringify(value));
const fromBase64 = value => JSON.parse(atob(value));

export default Hock({
    hock: (config) => (Component: *): * => {
        class QueryStateHock extends React.Component<Object, Object> {
            constructor(props: Object) {
                super(props);

                const record = config.record();
                if(!record) {
                    console.warn('QueryStateHock msut be configured with a Record');
                }

                const data = fromBase64(props.query[config.key] || toBase64(config.defaults(props)));

                const parcel = Parcel({
                    value: new record(data),
                    handleChange: (parcel: *) => {
                        this.setState({parcel});
                        props.updateQuery({
                            [config.key]: toBase64(parcel.value())
                        });
                    }

                });
                this.state = {parcel};
            }
            render(): Element<*> {
                return <Component
                    {...this.props}
                    parcel={this.state.parcel}
                />;
            }
        }

        return QueryStringHock({replaceState: true})(QueryStateHock);
    },
    defaultConfig: {
        record: () => null,
        defaults: () => ({}),
        key: 'q'
    },
    shorthandKey: 'record'
});
