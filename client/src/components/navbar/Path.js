import React from 'react';
import PathEntry from './PathEntry';

const Path = (props) => {
    let entries = props.path;
    let nameEntries = [];
    for(let i = 0; i < entries.length; i += 2) {
        nameEntries.push(entries[i]);
    }

    return (
        <>
        {    nameEntries && nameEntries.map((entry, index) => (
            <PathEntry
                key={index}
                index={index}
                name={entry}
                path={props.path}
                setPath={props.setPath}
                setActiveRegion={props.setActiveRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}
            />
        ))
            
        }
        </>
    );
};

export default Path;