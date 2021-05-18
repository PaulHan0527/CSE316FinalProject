import React from 'react';
import RegionNavbar from './RegionNavbar';
import RegionInfo from './RegionInfo';
import RegionLandmarks from './RegionLandmarks'
import { WRow, WCol } from 'wt-frontend';


const RegionMain = (props) => {


    return (
        <>
            <div>

                <RegionNavbar
                    allRegions={props.allRegions}
                    currentChildRegions={props.currentChildRegions}
                    activeRegion={props.activeRegion}
                    activeRegionViewer={props.activeRegionViewer}
                    setActiveRegionViewer={props.setActiveRegionViewer}
                    setActiveRegion={props.setActiveRegion}
                    // undo and redo
                    canUndo={props.canUndo}
                    canRedo={props.canRedo}
                    undo={props.undo}
                    redo={props.redo}
                    clearTransactions={props.clearTransactions}


                />


                <WRow>
                    <WCol size='6'>

                        <RegionInfo
                            allRegions={props.allRegions}
                            currentChildRegions={props.currentChildRegions}
                            activeRegion={props.activeRegion}
                            activeRegionViewer={props.activeRegionViewer}
                            setActiveRegionViewer={props.setActiveRegionViewer}
                            setActiveRegion={props.setActiveRegion}

                            changeParent={props.changeParent}


                        />

                    </WCol>
                    <WCol size='6'>
                        <RegionLandmarks
                            allRegions={props.allRegions}
                            currentChildRegions={props.currentChildRegions}
                            activeRegion={props.activeRegion}
                            activeRegionViewer={props.activeRegionViewer}
                            setActiveRegionViewer={props.setActiveRegionViewer}
                            setActiveRegion={props.setActiveRegion}

                            addLandmark={props.addLandmark}
                            updateLandmark={props.updateLandmark}
                            deleteLandmark={props.deleteLandmark}



                        />

                    </WCol>
                </WRow>


            </div>
        </>
    )
};


export default RegionMain;
