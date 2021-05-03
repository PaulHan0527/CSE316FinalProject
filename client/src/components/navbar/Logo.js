import React from 'react';
import { WButton, WNavItem } from 'wt-frontend';
import Homescreen from '../homescreen/Homescreen';
import { useHistory } from 'react-router-dom';

const Logo = (props) => {
    let history = useHistory();
    const handleClick = () => {
        console.log(props.auth);
        props.setPath([]);
        if (props.auth) {
            props.setActiveRegion({});
            history.push("/home/maps")
        }
        else {
            props.setActiveRegion({});
            history.push("/home")
        }

    }
    return (

        <WButton className="logo" wType="texted" hoverAnimation="text-primary" onClick={handleClick} hoverAnimation="lighten">
            The World Data Mapper
        </WButton>

    );
};

export default Logo;