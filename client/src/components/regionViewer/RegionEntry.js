import React, { useState } from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout, WLFooter, WLHeader, WLMain } from 'wt-frontend';
import DeleteLandmark from '../modals/DeleteLandmark'

const RegionEntry = (props) => {
    const directChild = true;
    const [editingName, toggleNameEdit] = useState(false);
    const [showDelete, toggleShowDelete] = useState(false);

    const setShowDelete = () => {
        toggleShowDelete(!showDelete);
    }

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : props.landmark;
        const prevName = props.landmark;
        if(newName !== prevName) {
            let flag = true;
            for(let i = 0 ; i < props.allLandmarks.length; i++) {
                if(props.allLandmarks[i] === newName) {
                    flag =false;
                    alert("There is a duplicate landmark! Please add different landmark.")
                }
            }
            if(flag) {
                props.updateLandmark(props.activeRegionViewer, prevName, newName);
            }
        }
        
        
        
    }

    return (
        <>
            {
                directChild ?
                    <WRow className="landmark-entries">
                        <WCol size='1'>
                            <WButton className="region-viewer-buttons-delete" clickAnimation="ripple-light" hoverAnimation="darken" onClick={() => toggleShowDelete(!showDelete)}>
                                <i className="material-icons">close</i>
                            </WButton>

                        </WCol>
                        {
                            showDelete && (<DeleteLandmark  
                                landmark={props.landmark}
                                deleteLandmark={props.deleteLandmark}
                                setShowDelete={setShowDelete}
                                activeRegionViewer={props.activeRegionViewer}/>)
                        }
                        <WCol size='11'>
                            {
                                editingName ?
                                    <WInput className='region-landmarks-entry-input' onBlur={handleNameEdit} onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                                        autoFocus={true} defaultValue={props.landmark} type='text' />
                                    :
                                    <WButton className='region-landmarks-entry' onClick={() => toggleNameEdit(!editingName)} wType='texted'>
                                        {props.landmark}
                                    </WButton>
                            }

                        </WCol>

                    </WRow>
                    :
                    <WRow className="landmark-entries">
                        <WCol size='1'>
                        </WCol>

                        <WCol size='11'>
                            {
                                <div className='region-landmarks-entry-not-direct'>
                                    {props.landmark}
                                </div>
                            }

                        </WCol>

                    </WRow>
            }

        </>
    );
}

export default RegionEntry;