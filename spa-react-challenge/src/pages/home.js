import React, { useState } from 'react';
import Search from '../components/Search';
import { HttpGet } from '../components/HttpRequest';

import Logo from '../assets/logo/Group.png';
import Favorite from '../assets/icones/heart/Path.png';

export default function Home() {
    const [heroes, setHeroes] = useState([]);

    const findHeroes = (stringToFind) => {
        HttpGet(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${stringToFind}`)
            .then(result => setHeroes(result.data.data.results))
            .catch(error => console.error(error));
    }

    return (
        <div className="main">
            <img src={Logo} alt="Logo Marvel" style={{ margin: '30px 0px' }} />
            <h1>EXPLORE O UNIVERSO</h1>
            <p>Mergulhe no domínio deslumbrante dos todos os personagens clássicos que você ama - e aqueles que você descobirá em breve!</p>
            <Search style={{ backgroundColor: '#fdecec', margin: '30px 0px', width: '80%' }} onKeyDown={findHeroes}></Search>

            <div className="top-panel">
                <span>{`Encontrados ${heroes.length} heróis`}</span>
            </div>

            <div className="heroes-list">
                {
                    heroes.map(hero =>
                        <div key={hero.id} className="hero-block" onClick={() => alert(`Detalhes: ${hero.id}`)}>
                            <div className="hero-thumbnail" style={{ backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})` }}></div>
                            <div className="hero-name">
                                <img src={Favorite} onClick={event => { alert(`Favorito: ${hero.id}`); event.stopPropagation(); }} alt="Favoritar" />
                                <p>{hero.name}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}