import React, { useState } from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';

const CreateRegion = (props) => {
    const [input, setInput] = useState({ name: '' });
    let history = useHistory();

    const handleCreateRegion = async () => {
        if (input.name) {
            props.createNewRootRegion(input.name);
            // props.reloadRegions();
            props.setShowCreateRegion();

        }
        else {
            alert("Please enter the name of the map.")
        }
    }

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value };
        setInput(updated);
    }

    return (
        <WModal className="signup-modal" cover="true" visible={props.setShowCreateRegion} animation='slide-fade-top'>
            <WMHeader className="modal-header" onClose={() => props.setShowCreateRegion(false)}>
                Create A New Map
			</WMHeader>

            <WMMain className="modal-main">
                <WRow>
                    <WCol size='12'>
                        <WInput className="modal-input" onBlur={updateInput} name='name' />
                    </WCol>
                </WRow>
                <div className="modal-spacer">&nbsp;</div>

                <WRow className="modal-buttons-row">
                    <WCol size='1'></WCol>
                    <WCol size='4'>
                        <WButton className="modal-button" onClick={handleCreateRegion} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
                            Create
						</WButton>
                    </WCol>

                    <WCol size='2'></WCol>
                    <WCol size='4'>
                        <WButton className="modal-button cancel-button" onClick={() => props.setShowCreateRegion(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
                            Cancel
						</WButton>
                    </WCol>
                    <WCol size='1'></WCol>
                </WRow>



            </WMMain>



        </WModal>
    );
}

export default CreateRegion;
