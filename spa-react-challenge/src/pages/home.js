import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Search from '../components/Search';
import Favorite from '../components/Favorite';

import Logo from '../assets/logo/Group.png';
import IconFavorite from '../assets/icones/heart/Path.svg';
import IconHero from '../assets/icones/heroi/noun_Superhero_2227044@1,5x.svg';

export default function Home() {
    const heroes = useSelector(state => state.heroes);
    const favorites = useSelector(state => state.favorites);
    const [showOrderned, setShowOrderned] = useState(false);
    const [favoritesOnly, setFavoritesOnly] = useState(false);

    const heroesMemo = useMemo(() => {
        if (heroes && heroes.length > 0) {
            let heroesTmp = Object.assign(heroes);

            if (favoritesOnly) {
                heroesTmp = heroesTmp.filter(hero => favorites.findIndex(id => id === hero.id) > -1);
            }

            if (showOrderned) {
                heroesTmp = heroesTmp.sort((a, b) => sortHeroes(a, b));
            }

            return heroesTmp.filter((item, index) => index < 20);
        }

        return [];
    }, [heroes, showOrderned, favoritesOnly]);

    function sortHeroes(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    return (
        <div className="main">
            <div className="main-header">
                <img src={Logo} alt="Logo Marvel" style={{ margin: '30px 0px' }} />
                <h1>EXPLORE O UNIVERSO</h1>
                <p>Mergulhe no domínio deslumbrante dos todos os personagens clássicos que você ama - e aqueles que você descobirá em breve!</p>
                <Search placeholder="Procure por heróis" style={{ backgroundColor: '#fdecec', margin: '30px 0px', width: '80%' }}></Search>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <div className="heroes-counter">{`Encontrados ${heroes.length || 0} heróis`}</div>
                    <div className="order-opt">
                        <img src={IconHero} alt="Ordenar" />
                        Ordenar por nome - A/Z
                        <input type="checkbox" checked={showOrderned} onChange={e => setShowOrderned(e.target.checked)} ></input>
                    </div>
                    <div className="only-favorites">
                        <img src={IconFavorite} alt="Somente favoritos" />
                        Somente favoritos
                        <input type="checkbox" checked={favoritesOnly} onChange={e => setFavoritesOnly(e.target.checked)} ></input>
                    </div>
                </div>
                <ul className="heroes-list">
                    {
                        heroesMemo.map(hero => 
                            <li key={hero.id} className="hero-block">
                                <Link to={`/details/${hero.id}`}>
                                    <div className="hero-thumbnail" style={{ backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})` }}></div>
                                </Link>
                                <div className="hero-name">
                                    <Favorite id={hero.id} style={{ cursor: 'pointer', float: 'right', height: '15px' }} />
                                    <Link to={`/details/${hero.id}`}>
                                        <p>{hero.name}</p>
                                    </Link>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}