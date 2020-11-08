import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (
            <input 
                type="search"
                placeholder="Procure por heróis"
                //onChange={data => { console.log(data.target.value) }}
                style={this.props.style}>
            </input>
        );
    } 
}