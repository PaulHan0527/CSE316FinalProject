// return spreadHeader and spreadList

import React            from 'react';
import SpreadHeader from './SpreadHeader';
import SpreadNavBar from './SpreadNavBar';
import SpreadList from './SpreadList';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';
import {useParams} from "react-router-dom";

const SpreadMain = (props) => {

    const { id } = useParams();

    let activeRegion = props.allRegions.find(entry => entry._id === id);
    let currentChildRegions = props.allRegions.filter(entry => entry.parentId === id);

    return (
        
        <div>
            

            
            <SpreadNavBar
                name={props.name}
                parentId={props._id}
                createNewRegion={props.createNewRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}
                // undo , redo , add
            />
            <SpreadHeader 
                // sort

            />
           
            <SpreadList
                name={props.name}
                _id={props._id}
                reloadRegions={props.reloadRegions}

                clickedRegion={props.clickedRegion}
                setActiveRegion={props.setActiveRegion}
                setActiveRegionViewer={props.setActiveRegionViewer}
                
                currentChildRegions={currentChildRegions}
                deleteRegion={props.deleteRegion}

                path={props.path} setPath={props.setPath}
            />
            
        </div>
    )
}

export default SpreadMain;