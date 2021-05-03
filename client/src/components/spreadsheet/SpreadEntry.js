import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { WNavItem, WInput, WRow, WCol, WButton } from 'wt-frontend';
import DeleteSubregion from '../modals/DeleteSubregion';

const SpreadEntry = (props) => {

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [showDelete, toggleShowDelete] = useState(false);
    const name = props.name; 
    const capital = props.capital;
    const leader = props.leader;
    const history = useHistory();
    let landmarkString;
    if (props.landmarks.length === 0) {
        landmarkString = "None";
    }
    else if (props.landmarks.length === 1) {
        landmarkString = props.landmarks[0];
    }
    else {
        landmarkString = props.landmarks[0] + ", ...";
    }


    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : "Null Name";
        const prevName = name;
        if (newName !== prevName) {
            // props.editRegionName field name

            props.reloadRegions();
        }
    }
    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : "Null Name";
        const prevCapital = capital;
        if (newCapital !== prevCapital) {
            // props.editRegionName(props._id, 'name', newName, prevName);

            props.reloadRegions();
        }
    }
    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : "Null Name";
        const prevLeader = leader;
        if (newLeader !== prevLeader) {
            // props.editRegionName(props._id, 'name', newName, prevName);

            props.reloadRegions();
        }
    }

    const setShowDelete = () => {
        toggleShowDelete(!showDelete);
    }

    const handleRegionClick = () => {
        let string = '/home/maps/' + props._id;
        props.setActiveRegion({name: props.name, _id:props._id});
        let newArray = props.path;
        newArray.push(props.name);
        newArray.push(props._id);
        props.setPath(newArray);
        history.push(string);
    }

    const handleLandmarkClick = () => {
        props.setActiveRegionViewer({name: props.name, _id:props._id});
        let string = '/home/region/' + props._id;
        history.push(string);
        
    }

    return (
        <WRow className="spread-entry">
            <WCol size='1'>
                <WButton className="spread-entry-delete" clickAnimation="ripple-light" hoverAnimation="darken" onClick={()=>{setShowDelete()}}>
                    <i className="material-icons">close</i>
                </WButton>
            </WCol>
            <WCol size='2'>
                <WButton className='spread-entry-section' wType="texted" onClick={handleRegionClick}>
                    {props.name}
                </WButton>
            </WCol>
            <WCol size='2'>
                <WButton className='spread-entry-section' wType="texted">
                    {props.capital}
                </WButton>
            </WCol>
            <WCol size='2'>
                <WButton className='spread-entry-section' wType="texted">
                    {props.leader}
                </WButton>
            </WCol>
            <WCol size='1'>
                <WButton className='spread-entry-section' wType="texted">
                    TBD
                    </WButton>
            </WCol>
            <WCol size='3'>
                <WButton className='spread-entry-section' wType="texted" onClick={handleLandmarkClick}> 
                    {landmarkString} 
                </WButton>

                {
                showDelete && (<DeleteSubregion deleteRegion={props.deleteRegion} reloadRegions={props.reloadRegions} setShowDelete={setShowDelete} _id={props._id} parentId={props.parentId} />)
                }
            </WCol>

        </WRow>


    );

};

export default SpreadEntry;