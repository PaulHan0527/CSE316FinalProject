// every landmarks of itself , + sub region landmarks entry + adding landmark button
import React from 'react';
import { WNavItem, WInput, WRow, WCol, WButton, WLayout, WLFooter, WLHeader, WLMain } from 'wt-frontend';
import RegionEntry from '../regionViewer/RegionEntry';


const RegionLandmarks = (props) => {

    let allLandmarks = [];
    let activeRV = props.allRegions.find(x => x._id === props.activeRegionViewer._id);
    if (activeRV) {
        for (let i = 0; i < activeRV.landmarks.length; i++) {
            allLandmarks.push(activeRV.landmarks[i]);
        }
        // console.log(allLandmarks);
    }
    // let childs = activeRV.childRegionIds; this is where I need to recursively find the landmarks




    const handleAddLandmark = () => {
        let string = document.getElementById("landmark-value").value;
        document.getElementById("landmark-value").value = "";
        if (string) {
            let flag = true;
            for(let i = 0 ; i < allLandmarks.length; i++) {
                if(allLandmarks[i] === string) {
                    flag = false;
                    alert("There is a duplicate landmark! Please add different landmark.")
                    
                }
            }
            if(flag) {
                props.addLandmark(props.activeRegionViewer, string);
            }
        }
        else {
            alert("Please enter the name of the landmark");
        }

    }





    return (
        <>
            <WRow>
                <WCol size="4"></WCol>
                <WCol size="4" className="region-landmark-header">Region Landmarks: </WCol>
                <WCol size="4"></WCol>

            </WRow>
            <div className="modal-spacer">&nbsp;</div>
            <WLayout className="region-landmark-regions" wLayout='footer'>
                <WLMain className="landmark-box">

                {
                allLandmarks && allLandmarks.map(entry => (
                    <div className="region-landmark-entries" key={entry}>
                        <RegionEntry
                            landmark={entry}
                            updateLandmark={props.updateLandmark}
                            activeRegionViewer={props.activeRegionViewer}
                            allLandmarks={allLandmarks}
                            deleteLandmark={props.deleteLandmark}

                        />
                    </div>

                ))

            }

                </WLMain>
                <WLFooter className="landmark-footer">
                    <WRow>
                        <WCol size='1'>
                            <WButton className='add-landmark-button' onClick={handleAddLandmark}>
                                <i className="material-icons">add</i>
                            </WButton>

                        </WCol>
                        <WCol size='11'>
                            {/* <WInput className='landmark-input' id="landmark-value" placeholderText="Enter the name of a landmark" onBlur={() => { }} autoFocus={true} type='text' /> */}
                            <input className='landmark-input' type="text" id="landmark-value" placeholder="Enter the name of a landmark"></input>
                        </WCol>
                    </WRow>


                </WLFooter>
            </WLayout>
            
        </>



    )
};

export default RegionLandmarks;