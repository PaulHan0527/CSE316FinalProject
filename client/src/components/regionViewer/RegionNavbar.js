// undo redo   and next and prev region viewer buttons
import React from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';
import { useHistory } from "react-router-dom";

const RegionNavbar = (props) => {
    let history = useHistory();
    console.log(props.currentChildRegions);
    let currentViewer = props.activeRegionViewer;
    console.log(currentViewer);
    let canGoNext;
    let canGoPrev;
    
    // I made it so that if active Region viewer is the active region it cannot move to sibling / ONLY through spreadsheets (childs of the active region)
    if(currentViewer._id === props.activeRegion._id) {
        canGoNext = false;
        canGoPrev = false;
    }
    else {
        // let pool = props.allRegions.filter(x => x.parentId === currentViewer.)
    }
    
    const handleClickBack = () => {
        props.setActiveRegionViewer({});
        props.clearTransactions();
        let string = '/home/maps/' + props.activeRegion._id;
        history.push(string);
        
    }



    return (
        <WRow>
            <WCol size = '3'>
                <div className='region-header-buttons'>
                <WButton className="region-header-button-back" clickAnimation="ripple-light" hoverAnimation="darken" onClick={handleClickBack}>
                    Back To Regions
                </WButton>
                <WButton className={props.canUndo ? "table-header-button" : "table-header-button-disabled"} onClick={props.undo ? props.undo : null} clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton className={props.canUndo ? "table-header-button" : "table-header-button-disabled"} onClick={props.undo ? props.undo : null} clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">redo</i>
                </WButton>
                </div>
                
            
            </WCol>
            
            <WCol size='4'>
            </WCol>
            <WCol size='5'>

            <WButton className="region-header-button-go"  clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">arrow_back</i>
                </WButton>
                <WButton className="region-header-button-go" clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">arrow_forward</i>
                </WButton>
               
            </WCol>
            
        </WRow>


    )
}

export default RegionNavbar;