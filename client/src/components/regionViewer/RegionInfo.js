// flag , name, parent region name, region capital, leader ,# of subregions
import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';
import RegionModal from './RegionModal';


const RegionInfo =(props) => {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../utils/The World', false, /\.(png|jpe?g|svg)$/));


    let regionViewer;
    let parentRegion;
    let history = useHistory();
    // console.log(props.activeRegion);
    
    if(props.currentChildRegions.length > 0) {
        regionViewer = props.currentChildRegions.filter(entry => (entry._id === props.activeRegionViewer._id))[0];
    }
    let activeRegion = props.allRegions.filter(entry => (entry._id === props.activeRegion._id))[0];
    
    if(activeRegion.parentId === 'root') {
        parentRegion = "Root Region"
    }
    else {
        parentRegion = props.allRegions.filter(entry => (entry._id === activeRegion.parentId))[0].name;
    }

    const [showModal, setShowModal] = useState(false);
    // parent Region edit , probably dropdown menu of all regions ? have to think

    return (
        <>
         <div className="modal-spacer">&nbsp;</div>
         <div className="modal-spacer">&nbsp;</div>
        <WRow>
            <WCol size="1">


            </WCol>
            <WCol size='7'>
                <div>
                 {images[`${props.activeRegionViewer.name} Flag.png`] === undefined ?
                        <img className="flag-entries-viewer" src={images[`ImageNotFound.jpg`].default} alt="Flag Not Found" /> :
                        <img className="flag-entries-viewer" src={images[`${props.activeRegionViewer.name} Flag.png`].default} alt="Flag Not Found" />
                    }
                </div>
            </WCol>
            <WCol size="4">


            </WCol>
        </WRow>
        <div className="modal-spacer">&nbsp;</div>
        <div className="modal-spacer">&nbsp;</div>
        <WRow>
            <WCol size='5' className="region-info">
                Region Name: 
            </WCol>
            <WCol size='7' className="region-info-values">
                {regionViewer ? regionViewer.name : activeRegion.name}
            </WCol>
        </WRow>
        <WRow>
            <WCol size='5' className="region-info">
                Parent Region:  
            </WCol>
            <WCol size='4' className="region-info-values-editable">
                {regionViewer ? props.activeRegion.name : parentRegion}
                
            </WCol>
            <WCol size = '2'>
                <WButton className="edit-button"  clickAnimation="ripple-light" hoverAnimation="darken" color='default' onClick={() => setShowModal(!showModal)}>
                    <i className="material-icons">edit</i>
                </WButton>
            </WCol>
        </WRow>
        
        <WRow>
            <WCol size='5' className="region-info">
                Region Capital: 
            </WCol>
            <WCol size='7' className="region-info-values">
                {regionViewer ? regionViewer.capital : activeRegion.capital}
            </WCol>
        </WRow>
        <WRow>
            <WCol size='5' className="region-info">
                Region Leader: 
            </WCol>
            <WCol size='7' className="region-info-values">
                {regionViewer? regionViewer.leader : activeRegion.leader}
            </WCol>
        </WRow>
        <WRow>
            <WCol size='5' className="region-info">
                # of Sub Regions: 
            </WCol>
            <WCol size='7' className="region-info-values">
                {regionViewer ? regionViewer.childRegionIds.length : props.currentChildRegions.length}
            </WCol>
        </WRow>
        {
            showModal && <RegionModal 
                    setShowModal={setShowModal} showModal={showModal}
                    allRegions={props.allRegions}
                    currentChildRegions={props.currentChildRegions}
                            activeRegion={props.activeRegion}
                            activeRegionViewer={props.activeRegionViewer}
                            setActiveRegionViewer={props.setActiveRegionViewer}
                            setActiveRegion={props.setActiveRegion}
                            changeParent={props.changeParent}
                />
        }
        
        
        </>
    )

};

export default RegionInfo;