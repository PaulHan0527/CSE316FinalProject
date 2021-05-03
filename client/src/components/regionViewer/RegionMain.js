import React            from 'react';
import RegionNavbar from './RegionNavbar';
import RegionInfo from './RegionInfo';
import RegionLandmarks from './RegionLandmarks'
import { WNavItem, WInput, WRow, WCol, WButton, WCard, WCContent, WCMedia} from 'wt-frontend';
import { useParams } from 'react-router';


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
            
            
            />
            
            
            <WRow>
            <WCol size = '6'>
                
                <RegionInfo 
                    allRegions={props.allRegions}
                    currentChildRegions={props.currentChildRegions}
                    activeRegion={props.activeRegion}
                    activeRegionViewer={props.activeRegionViewer}
                    setActiveRegionViewer={props.setActiveRegionViewer}
                    setActiveRegion={props.setActiveRegion}
                
                
                
                />

            </WCol>
            <WCol size = '6'>
                <RegionLandmarks
                    allRegions={props.allRegions}
                    currentChildRegions={props.currentChildRegions}
                    activeRegion={props.activeRegion}
                    activeRegionViewer={props.activeRegionViewer}
                    setActiveRegionViewer={props.setActiveRegionViewer}
                    setActiveRegion={props.setActiveRegion}
                
                
                
                />

            </WCol>
            </WRow>


        </div>
        </>
    )
};


export default RegionMain;
