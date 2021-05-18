import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { WNavItem, WInput, WRow, WCol, WButton } from 'wt-frontend';
import DeleteSubregion from '../modals/DeleteSubregion';

const SpreadEntry = (props) => {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../utils/The World', false, /\.(png|jpe?g|svg)$/));



    const [editingName, toggleNameEdit] = useState(props._id === props.activeId && props.activeField === "name");
    const [editingCapital, toggleCapitalEdit] = useState(props._id === props.activeId && props.activeField === "capital");
    const [editingLeader, toggleLeaderEdit] = useState(props._id === props.activeId && props.activeField === "leader");
    const [showDelete, toggleShowDelete] = useState(false);

    useEffect(() => {
        toggleNameEdit(props._id === props.activeId && props.activeField === "name");
        toggleCapitalEdit(props._id === props.activeId && props.activeField === "capital");
        toggleLeaderEdit(props._id === props.activeId && props.activeField === "leader");
    }, [props.activeId, props.activeField]);

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
    else if (props.landmarks.length === 2) {
        landmarkString = props.landmarks[0] + ", " + props.landmarks[1];
    }
    else {
        landmarkString = props.landmarks[0] + ", " + props.landmarks[1] + ", ..."
    }


    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : name;
        const prevName = name;
        if (newName !== prevName) {
            // props.editRegionName field name
            props.updateRegion(props._id, prevName, newName, 'name');
            props.reloadRegions();
        }
    }
    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : "Null Name";
        const prevCapital = capital;
        if (newCapital !== prevCapital) {
            // props.editRegionName(props._id, 'name', newName, prevName);
            props.updateRegion(props._id, prevCapital, newCapital, 'capital')
            props.reloadRegions();
        }
    }
    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : "Null Name";
        const prevLeader = leader;
        if (newLeader !== prevLeader) {
            // props.editRegionName(props._id, 'name', newName, prevName);
            props.updateRegion(props._id, prevLeader, newLeader, 'leader')
            props.reloadRegions();
        }
    }

    const setShowDelete = () => {
        toggleShowDelete(!showDelete);
    }

    const handleRegionClick = () => {
        let string = '/home/maps/' + props._id;
        props.setActiveRegion({ name: props.name, _id: props._id });
        props.clearTransactions();
        let newArray = props.path;
        newArray.push(props.name);
        newArray.push(props._id);
        props.setPath(newArray);
        history.push(string);
    }

    const handleLandmarkClick = () => {
        props.setActiveRegionViewer({ name: props.name, _id: props._id });
        props.clearTransactions();
        let string = '/home/region/' + props._id;
        history.push(string);

    }
    // 37 : left ,              39 : right ,            40 : down,               38 : up
    const handleNameKeyDown = (e) => {
        if (e.keyCode === 13 || e.key === "Escape") {
            handleNameEdit(e);
        }
        else if (e.keyCode === 39) {
            toggleCapitalEdit(true);
        }
        else if (e.keyCode === 40) {
            // down 
            if (props.childIds[props.childIds.length - 1] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleNameEdit(e);
                props.setActiveId(props.childIds[current + 1]);
                props.setActiveField("name")
            }
        }
        else if (e.keyCode === 38) {
            // up
            if (props.childIds[0] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleNameEdit(e);
                props.setActiveId(props.childIds[current - 1]);
                props.setActiveField("name")
            }
        }
    }

    const handleCapitalKeyDown = async (e) => {
        if (e.keyCode === 13 || e.key === "Escape") {
            handleCapitalEdit(e);
        }
        else if (e.keyCode === 39) {
            toggleLeaderEdit(true);
        }
        else if (e.keyCode === 37) {
            toggleNameEdit(true);
        }
        else if (e.keyCode === 40) {
            // down 
            if (props.childIds[props.childIds.length - 1] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleCapitalEdit(e);
                props.setActiveId(props.childIds[current + 1]);
                props.setActiveField("capital")
            }
        }
        else if (e.keyCode === 38) {
            // up
            if (props.childIds[0] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleCapitalEdit(e);
                props.setActiveId(props.childIds[current - 1]);
                props.setActiveField("capital")
            }
        }
    }


    const handleLeaderKeyDown = async (e) => {
        if (e.keyCode === 13 || e.key === "Escape") {
            handleLeaderEdit(e);
        }
        else if (e.keyCode === 37) {
            toggleCapitalEdit(true);
        }
        else if (e.keyCode === 40) {
            if (props.childIds[props.childIds.length - 1] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleLeaderEdit(e);
                props.setActiveId(props.childIds[current + 1]);
                props.setActiveField("leader")
            }
        }
        else if (e.keyCode === 38) {
            if (props.childIds[0] !== props._id) {
                let current = props.childIds.indexOf(props._id);
                handleLeaderEdit(e);
                props.setActiveId(props.childIds[current - 1]);
                props.setActiveField("leader")
            }
        }
    }
    return (
        <WRow className="spread-entry">
            <WCol size='1'>
                <WButton className="spread-entry-delete" clickAnimation="ripple-light" hoverAnimation="darken" onClick={() => { setShowDelete() }}>
                    <i className="material-icons">close</i>
                </WButton>
                {
                    showDelete && (<DeleteSubregion deleteRegion={props.deleteRegion} reloadRegions={props.reloadRegions} setShowDelete={setShowDelete} _id={props._id} parentId={props.parentId} parentName={props.parentName} />)
                }
            </WCol>
            <WCol size='2'>
                {
                    editingName ?
                        <WInput className='spread-entry-section-input' onBlur={handleNameEdit} onKeyDown={(e) => handleNameKeyDown(e)} autoFocus={true} defaultValue={name} type='text' />
                        :
                        <WButton className='spread-entry-section' onClick={() => handleRegionClick()} wType='texted'>
                            {props.name}
                        </WButton>
                }
            </WCol>
            <WCol size='2'>
                {
                    editingCapital ?
                        <WInput className='spread-entry-section-input' onBlur={handleCapitalEdit} onKeyDown={(e) => handleCapitalKeyDown(e)}
                            autoFocus={true} defaultValue={capital} type='text' />
                        :
                        <WButton className='spread-entry-section' onClick={() => toggleCapitalEdit(!editingCapital)} wType='texted'>
                            {props.capital}
                        </WButton>
                }

            </WCol>
            <WCol size='2'>
                {
                    editingLeader ?
                        <WInput className='spread-entry-section-input' onBlur={handleLeaderEdit} onKeyDown={(e) => handleLeaderKeyDown(e)}
                            autoFocus={true} defaultValue={leader} type='text' />
                        :
                        <WButton className='spread-entry-section' onClick={() => toggleLeaderEdit(!editingLeader)} wType='texted'>
                            {props.leader}
                        </WButton>
                }
            </WCol>
            <WCol size='1'>
                <div>
                    {images[`${props.name} Flag.png`] === undefined ?
                        <img className="flag-entries" src={images[`ImageNotFound.jpg`].default} alt="Flag Not Found" /> :
                        <img className="flag-entries" src={images[`${props.name} Flag.png`].default} alt="Flag Not Found" />
                    }

                </div>
            </WCol>
            <WCol size='3'>
                <WButton className='spread-entry-section' wType="texted" onClick={handleLandmarkClick}>
                    {landmarkString}
                </WButton>
            </WCol>

        </WRow>


    );

};

export default SpreadEntry;