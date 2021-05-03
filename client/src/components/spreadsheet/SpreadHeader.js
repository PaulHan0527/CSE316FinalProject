import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadHeader = (props) => {


    // onclick events handling is needed for sort

    return (
        <div className='table-header'>
            <WRow>
                <WCol size='1'>
                    
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted"> 
                        Name
                    </WButton>
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted">
                        Capital
                    </WButton>
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted">
                        Leader
                    </WButton>
                </WCol>
                <WCol size='1'>
                    <WButton className='table-header-section' wType="texted">
                        Flag
                    </WButton>
                </WCol>
                <WCol size='3'>
                    <WButton className='table-header-section' wType="texted">
                        Landmarks
                    </WButton>
                </WCol>
            </WRow>

        </div>
        
    );


};

export default SpreadHeader;