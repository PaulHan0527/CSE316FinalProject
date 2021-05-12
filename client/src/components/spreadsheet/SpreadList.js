import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';
import SpreadEntry from './SpreadEntry';

const SpreadList = (props) => {

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
                        parentName={props.name}
                        
                        setActiveRegion={props.setActiveRegion}

                        setActiveRegionViewer={props.setActiveRegionViewer}
                        path={props.path} setPath={props.setPath}
                        clearTransactions={props.clearTransactions}
                        updateRegion={props.updateRegion}
                    />

                </div>

            ))

            }
        </>



    );


};

export default SpreadList;