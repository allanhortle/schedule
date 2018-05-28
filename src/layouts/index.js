import React from "react";
import Link from "gatsby-link";

import "../sass/styles.scss";

class DefaultLayout extends React.Component {
    render() {
        return <div>{this.props.children()}</div>;
    }
}

export default DefaultLayout;
