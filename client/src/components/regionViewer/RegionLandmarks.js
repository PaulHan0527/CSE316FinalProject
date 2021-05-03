// every landmarks of itself , + sub region landmarks entry + adding landmark button
import React from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout } from 'wt-frontend';


const RegionLandmarks = (props) => {

    let allLandmarks;





    return (
        <>
        <WRow>
            <WCol size="4"></WCol>
            <WCol size="4" className="region-landmark-header">Region Landmarks: </WCol>
            <WCol size="4"></WCol>

        </WRow>
        <div className="modal-spacer">&nbsp;</div>
        <WLayout className="region-landmark-regions">

        </WLayout>
        {/* {
            allLandmarks && allLandmarks.map(entry => (
                <div className="region-landmarks-entry" key={entry._id}>
                    
                </div>

            ))

        } */}
        </>



    )
};

export default RegionLandmarks;