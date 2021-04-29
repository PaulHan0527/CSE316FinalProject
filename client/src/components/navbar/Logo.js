import React from 'react';
import { WButton, WNavItem } from 'wt-frontend';
import Homescreen from '../homescreen/Homescreen';

const Logo = (props) => {
    return (
        <WNavItem hoverAnimation="lighten">
                <WButton className="logo" wType="texted" hoverAnimation="text-primary">
                    The World Data Mapper
                </WButton>
        </WNavItem>
    );
};

export default Logo;