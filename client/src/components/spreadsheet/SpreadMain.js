// return spreadHeader and spreadList

import React from 'react';
import SpreadHeader from './SpreadHeader';
import SpreadNavBar from './SpreadNavBar';
import SpreadList from './SpreadList';

const SpreadMain = (props) => {

    return (

        <div>



            <SpreadNavBar
                name={props.name}
                parentId={props._id}
                createNewRegion={props.createNewRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}
                activeRegionViewer={props.activeRegionViewer}
                // undo , redo , add
                canUndo={props.canUndo}
                canRedo={props.canRedo}
                undo={props.undo}
                redo={props.redo}
                clearTransactions={props.clearTransactions}
            />
            <SpreadHeader
            // sort
                sort={props.sortTable}

            />

            <SpreadList
                name={props.name}
                _id={props._id}
                reloadRegions={props.reloadRegions}


                setActiveRegion={props.setActiveRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}

                currentChildRegions={props.currentChildRegions}
                deleteRegion={props.deleteRegion}

                path={props.path} setPath={props.setPath}
                clearTransactions={props.clearTransactions}
                updateRegion={props.updateRegion}
            />

        </div>
    )
}

export default SpreadMain;