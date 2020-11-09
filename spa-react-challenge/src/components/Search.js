import React, { useState } from 'react';

export default function Search(props) {
    const [value, setValue] = useState();

    function execute(event) {
        if (event.key === "Enter") {
            value && props.onKeyDown && props.onKeyDown(value);
        }
    }

    return (
        <input 
            type="search"
            placeholder="Procure por heróis"
            onChange={data => setValue(data.target.value)}
            style={props.style}
            onKeyDown={event => execute(event)}>
        </input>
    );
}