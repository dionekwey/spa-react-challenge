import React, { Component } from 'react';
import logo from '../assets/logo/Group.png';

export default class Home extends Component {
    render() {
        return (
            <div className="main">
                <h2>Home</h2>
                <picture>
                    <img src={logo} alt="Logo Marvel" />
                </picture>
                <input type="search" placeholder="Procure por heróis"></input>
            </div>
        );
    }
}