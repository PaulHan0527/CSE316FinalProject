import React, { useState } from 'react';

import { WModal, WMHeader, WMMain, WButton, WCol, WRow } from 'wt-frontend';
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter';

const RegionModal = (props) => {

    let activeRegionViewerInfo = props.allRegions.find(x => x._id === props.activeRegionViewer._id);

    let possibleParents = props.allRegions.filter(x => x.parentId === activeRegionViewerInfo.parentId && x !== activeRegionViewerInfo); // this is the activeRegionViewer's siblings
    let parent = props.allRegions.find(x => x._id === activeRegionViewerInfo.parentId);
    let possibleParents2 = props.allRegions.filter(x => x.parentId === parent.parentId && x._id !== parent._id); // this is the parent's siblings

    console.log(possibleParents);
    console.log(possibleParents2);
    possibleParents = possibleParents.concat(possibleParents2);
    console.log(possibleParents);

    const handleClick = async (newParent_id) => {
        let activeRegionViewerInfo = props.allRegions.find(x => x._id === props.activeRegionViewer._id);
        console.log(activeRegionViewerInfo);
        let parent = props.allRegions.find(x => x._id === activeRegionViewerInfo.parentId);
        console.log(parent);
        props.changeParent(activeRegionViewerInfo._id, parent._id, newParent_id);
        props.setShowModal(false);
    }



    return (
        <WModal className="changeParent-modal" visible={true} cover={true} animation="slide-fade-top">

            <div className="modal-header" onClose={() => props.setShowModal(false)}>
                <WMHeader onClose={() => props.setShowModal(false)}>
                    Which Parent Region?
                </WMHeader>
            </div>


            <WMMain className='changeParent-main'>
                
                {
                    possibleParents.length > 0 ?
                        possibleParents.map((entry, index) => (
                            <div key={index}>
                                <WRow>
                                    <WCol size='12'>
                                        <WButton className="changeParent-buttons" shape="rounded" hoverAnimation="darken" clickAnimation='ripple-light' onClick={() => handleClick(entry._id)}>
                                            {entry.name}
                                        </WButton>
                                    </WCol>
                                </WRow>
                                <div className="modal-spacer">&nbsp;</div>

                            </div>
                        ))
                        :

                        <div>
                            There is No parents to move to.
                    </div>
                }


            </WMMain>
            <WMFooter>
                <WRow className="modal-buttons-row">
                    <WCol size='1'></WCol>
                    <WCol size='4'>

                    </WCol>

                    <WCol size='2'></WCol>
                    <WCol size='4'>
                        <WButton className="modal-button cancel-button" onClick={() => props.setShowModal(false)} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
                            Cancel
				        </WButton>
                    </WCol>
                    <WCol size='1'></WCol>
                </WRow>
            </WMFooter>

        </WModal>
    );
}

export default RegionModal;