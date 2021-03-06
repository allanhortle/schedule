/* @flow */
import React from 'react';

type IndexProps = {
    css: string[],
    scripts: string[],
    content?: string
};

export default function index(props: IndexProps): React.Element<any> {
    return <html lang="">
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
            <title>schedule</title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {props.css && props.css.map(file => <link key={file} rel="stylesheet" href={file}/>)}
        </head>
        <body>
            <div id="schedule" dangerouslySetInnerHTML={{__html: props.content}}></div>

            {/*
                for prerendering to work webpack needs to build with libraryTarget set to commonjs2.
                So the below line is required to avoid errors when the bundle sets module.exports
            */}
            <script dangerouslySetInnerHTML={{__html: 'window.module = {};'}}/>
            {props.scripts && props.scripts.map(file => <script key={file} src={file}/>)}

        </body>
    </html>;
}
