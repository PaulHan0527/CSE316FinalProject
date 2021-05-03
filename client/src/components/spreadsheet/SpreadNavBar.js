import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';
import {useHistory } from 'react-router-dom';

const SpreadNavBar = (props) => {
    let history = useHistory();

    const handleAddRegion = () => {
        props.createNewRegion(props.parentId);
    }

    const handleLandmarkClick = () => {
        // console.log(props.parentId);
        props.setActiveRegionViewer({name: props.name, _id: props.parentId});
        let string = "/home/region/" + props.parentId;
        history.push(string);

    }


    return (
        <WRow>
            <WCol size = '1'>
                <div className='table-header-buttons'>
                <WButton className="table-header-button-add" clickAnimation="ripple-light" hoverAnimation="darken" onClick={handleAddRegion}>
                    <i className="material-icons">add</i>
                </WButton>
                <WButton className="table-header-button-disabled"  clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton className="table-header-button-disabled" clickAnimation="ripple-light" hoverAnimation="darken">
                    <i className="material-icons">redo</i>
                </WButton>
                </div>
                
            
            </WCol>
            
            <WCol size='4'>
            </WCol>
            <WCol size='5'>
                <h2 className='region-name-spreadsheet'> Region Name: <span className="region-name" onClick={handleLandmarkClick}>{props.name}</span></h2>
            </WCol>
            <WCol size='2'>

            </WCol>
        </WRow>
    );


};


export default SpreadNavBar;