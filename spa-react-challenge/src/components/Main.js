import React from 'react';
import logo from '../assets/logo/Group.png';

export default class Main extends React.Component {

    render() {
        return (
            <div className="main">
                <picture>
                    <img src={logo} alt="Logo Marvel" />
                </picture>
                <input type="search" placeholder="Procure por heróis"></input>
            </div>
        );
    }

}