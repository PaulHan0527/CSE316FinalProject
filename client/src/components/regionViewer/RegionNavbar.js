// undo redo   and next and prev region viewer buttons
import React from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';
import { useHistory } from "react-router-dom";

const RegionNavbar = (props) => {
    let history = useHistory();
    let currentViewer = props.activeRegionViewer;
    let canGoNext = true;
    let canGoPrev = true;

    // I made it so that if active Region viewer is the active region it cannot move to sibling / ONLY through spreadsheets (childs of the active region)
    if (currentViewer._id === props.activeRegion._id) {
        canGoNext = false;
        canGoPrev = false;
    }
    else {
        if(props.currentChildRegions.length !== 0) {
            console.log(props.currentChildRegions);
            if (props.currentChildRegions[0]._id === props.activeRegionViewer._id) {
                canGoPrev = false;
            }
            if (props.currentChildRegions[props.currentChildRegions.length - 1]._id === props.activeRegionViewer._id) {
                canGoNext = false;
            }
        }
        else {
            canGoPrev = false;
            canGoNext = false;
        }
        
    }

    const handleClickBack = () => {
        props.setActiveRegionViewer({});
        props.clearTransactions();
        let string = '/home/maps/' + props.activeRegion._id;
        history.push(string);

    }

    const handlePrevClick = () => {
        let childIds = props.currentChildRegions.map(x => x._id);
        let currentIndex = childIds.indexOf(props.activeRegionViewer._id);
        let id = props.currentChildRegions[currentIndex-1]._id;
        let name = props.currentChildRegions[currentIndex-1].name;

        props.setActiveRegionViewer({name: name , _id: id })
        props.clearTransactions();
        let string = '/home/region/' + id;
        history.push(string);

    }
    const handleNextClick = () => {
        let childIds = props.currentChildRegions.map(x => x._id);
        let currentIndex = childIds.indexOf(props.activeRegionViewer._id);
        let id = props.currentChildRegions[currentIndex+1]._id;
        let name = props.currentChildRegions[currentIndex+1].name;

        props.setActiveRegionViewer({name: name , _id: id })
        props.clearTransactions();
        let string = '/home/region/' + id;
        history.push(string);
    }



    return (
        <WRow>
            <WCol size='3'>
                <div className='region-header-buttons'>
                    <WButton className="region-header-button-back" clickAnimation="ripple-light" hoverAnimation="darken" onClick={handleClickBack}>
                        Back To Regions
                </WButton>
                    <WButton className={props.canUndo ? "table-header-button" : "table-header-button-disabled"} onClick={props.canUndo ? props.undo : null} clickAnimation="ripple-light" hoverAnimation="darken">
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton className={props.canRedo ? "table-header-button" : "table-header-button-disabled"} onClick={props.canRedo ? props.redo : null} clickAnimation="ripple-light" hoverAnimation="darken">
                        <i className="material-icons">redo</i>
                    </WButton>
                </div>


            </WCol>

            <WCol size='5'>
            </WCol>
            <WCol size='4'>

                <WButton className={canGoPrev ? "region-header-button-go-enabled" : "region-header-button-go"} onClick={canGoPrev ? handlePrevClick : null} clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">arrow_back</i>
                </WButton>
                <WButton className={canGoNext ? "region-header-button-go-enabled" : "region-header-button-go"} onClick={canGoNext ? handleNextClick : null} clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">arrow_forward</i>
                </WButton>

            </WCol>

        </WRow>


    )
}

export default RegionNavbar;