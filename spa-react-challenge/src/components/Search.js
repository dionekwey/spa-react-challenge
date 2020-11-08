import React from 'react';

export default function Search(props) {
    return (
        <input 
            type="search"
            placeholder="Procure por heróis"
            //onChange={data => { console.log(data.target.value) }}
            style={props.style}>
        </input>
    );
}