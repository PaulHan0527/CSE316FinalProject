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
        <div className="path-links">
        {    nameEntries && nameEntries.map((entry, index) => (
            <PathEntry
                key={index}
                index={index}
                name={entry}
                path={props.path}
                setPath={props.setPath}
                setActiveRegion={props.setActiveRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}
                clearTransactions={props.clearTransactions}
                activeRegion={props.activeRegion}
                activeRegionViewer={props.activeRegionViewer}

            />
        ))
            
        }
        </div>
        </>
    );
};

export default Path;