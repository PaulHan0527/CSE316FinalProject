// undo redo   and next and prev region viewer buttons
import React from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';
import { useHistory } from "react-router-dom";

const RegionNavbar = (props) => {
    let history = useHistory();

    const handleClickBack = () => {
        props.setActiveRegionViewer({});
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
                <WButton className="region-header-button-disabled"  clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton className="region-header-button-disabled" clickAnimation="ripple-light" hoverAnimation="darken">
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