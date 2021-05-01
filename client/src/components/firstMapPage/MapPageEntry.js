import React, { useState } from 'react';
import { WNavItem, WInput, WRow, WCol, WButton } from 'wt-frontend';
import Delete from '../modals/Delete';

const MapPageEntry = (props) => {

    const [editingName, toggleNameEdit] = useState(false);
    const [showDelete, toggleShowDelete] = useState(false);
    const name = props.name;
    

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : "Null Name";
        const prevName = name;
        console.log(newName);
        if (newName !== prevName) {
            // props.editRegionName(props._id, 'name', newName, prevName);
        }
    }

    const setShowDelete = () => {
        toggleShowDelete(!showDelete);
    }

    return (
        <WRow className="root-region-entry">
            <WCol size='10'>
                {editingName ?
                    <WInput className="root-region-input" onBlur={handleNameEdit}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                        autoFocus={true} defaultValue={name} type='text'>
                    </WInput>
                    :
                    <WButton className='root-region-text'>
                        {name}
                    </WButton>}
            </WCol>
            <WCol size='1'>
                <WButton className="root-buttons" onClick={() => toggleNameEdit(!editingName)} clickAnimation="ripple-light" hoverAnimation="darken" color='default'>
                    <i className="material-icons">edit</i>
                </WButton>
            </WCol>
            <WCol size='1'>
                <WButton className="root-buttons" onClick={() => toggleShowDelete(!showDelete)} clickAnimation="ripple-light" hoverAnimation="darken" color='default'>
                    <i className="material-icons">delete</i>
                </WButton>

                {
                showDelete && (<Delete deleteRootRegion={props.deleteRootRegion} reloadRegions={props.reloadRegions} setShowDelete={setShowDelete} _id={props._id} />)
                }
            </WCol>

        </WRow>


    );







};

export default MapPageEntry;