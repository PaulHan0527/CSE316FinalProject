import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import globeImage from '../../utils/globeImage.png';
import { WNavbar, WSidebar, WNavItem, WCol, WRow, WButton, WInput, WLHeader } from 'wt-frontend';
import MapPageEntry from './MapPageEntry';


const MapPageContents = (props) => {
    return (
        <>
            {
                props.rootRegionsData &&  
                props.rootRegionsData.map(entry => (
                    <MapPageEntry 
                        renameRootRegion={props.renameRootRegion}
                        reloadRegions={props.reloadRegions}
                        deleteRootRegion={props.deleteRootRegion}
                        name={entry.name} key={entry._id} _id={entry._id}
                        clickedRegion={props.clickedRegion}
                        setActiveRegion={props.setActiveRegion}
                        path={props.path} setPath={props.setPath}
													
                        
                    />
                ))
            }
        </>
    );
};

export default MapPageContents;
