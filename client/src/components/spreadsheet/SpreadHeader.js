import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadHeader = (props) => {

    const handleSort = (field) => {
        props.sortTable(field);
    }

    // onclick events handling is needed for sort

    return (
        <div className='table-header'>
            <WRow>
                <WCol size='1'>
                    
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted" onClick={() => handleSort('name')}> 
                        Name
                    </WButton>
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted" onClick={() => handleSort('capital')}>
                        Capital
                    </WButton>
                </WCol>
                <WCol size='2'>
                    <WButton className='table-header-section' wType="texted" onClick={() => handleSort('leader')}>
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