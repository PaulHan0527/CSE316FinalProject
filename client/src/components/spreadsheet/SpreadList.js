import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';
import SpreadEntry from './SpreadEntry';

const SpreadList = (props) => {




    // fix key somehow
    return (
        <>
            { props.currentChildRegions.length > 0  && props.currentChildRegions.map(entry => (
                <div className="table-entries" key={entry._id}>
                    <SpreadEntry
                        

                        _id={entry._id}
                        name={entry.name}
                        capital={entry.capital}
                        leader={entry.leader}
                        landmarks={entry.landmarks}
                        deleteRegion={props.deleteRegion}
                        reloadRegions={props.reloadRegions}
                        parentId={props._id}
                        clickedRegion={props.clickedRegion}
                        setActiveRegion={props.setActiveRegion}

                        setActiveRegionViewer={props.setActiveRegionViewer}
                        path={props.path} setPath={props.setPath}
                    />

                </div>

            ))

            }
        </>



    );


};

export default SpreadList;