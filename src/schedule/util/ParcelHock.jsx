// @flow
import React from 'react';
import type {Element} from 'react';
import Hock from 'stampy/lib/util/Hock';
import Parcel from 'proto-parcels';

export default Hock({
    hock: (config) => (Component: *): * => {
        class ParcelHock extends React.Component<Object, Object> {
            constructor(props: Object) {
                super(props);

                const parcel = Parcel({
                    value: props.value,
                    handleChange: (parcel: *) => {
                        this.setState({parcel});
                        props.onChange(parcel.value());
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

        return ParcelHock;
    }
});
