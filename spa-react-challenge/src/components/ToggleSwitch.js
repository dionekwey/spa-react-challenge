import React from 'react';

export default function ToggleSwitch(props) {

    return (
        <label className="switch">
            <input type="checkbox" {...props}></input>
            <span className="slider"></span>
        </label>
    );
    
}