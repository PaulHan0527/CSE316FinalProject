import React from 'react';
import { WButton, WNavItem } from 'wt-frontend';

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