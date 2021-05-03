import React from 'react';
import { WButton } from 'wt-frontend';
import { useHistory } from 'react-router-dom';


const PathEntry = (props) => {
    let history = useHistory();



    const handleClick = () => {
        let newArr = props.path.slice(0, (props.index+1) * 2);
        props.setActiveRegionViewer({});
        if(newArr.length === props.path.length) {
            let string = "/home/maps/" + props.path[(props.index + 1) * 2 -1]
            props.setPath(newArr);
            history.push(string);
            
        }
        else {
            props.setPath(newArr);
            props.setActiveRegion({name: props.name, _id: props.path[(props.index + 1) * 2 -1] });
            history.push("/home/maps/")
        }
    }

    



    return (
        <div>
            {
                props.path[0] === props.name ? null :<span className="material-icons">
                arrow_forward
            </span>
            }
            
            <WButton className= {props.path[(props.index + 1) * 2 -1] === props.path[props.path.length - 1] ? "path-buttons-current" : "path-buttons"} onClick={handleClick}>
                {props.name} 
            </WButton>
            
            
        </div>

    );
};

export default PathEntry;