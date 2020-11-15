import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Search } from '../components/Search';
import { HttpGet } from '../components/HttpRequest';
import Logo from '../assets/logo/Group.png';
import IconFavoriteOn from '../assets/icones/heart/Path.svg';
import IconFavoriteOff from '../assets/icones/heart/Path Copy 2@1,5x.svg';
import IconHero from '../assets/icones/heroi/noun_Superhero_2227044@1,5x.svg';

export default function Home() {
    const dispatch = useDispatch();
    const heroes = useSelector(state => state.heroes);
    const favorites = useSelector(state => state.favorites);
    const [showOrderned, setShowOrderned] = useState(false);
    const [favoritesOnly, setFavoritesOnly] = useState(false);


    useEffect(() => {
        HttpGet(`https://gateway.marvel.com/v1/public/characters`)
            .then(result => {
                dispatch({ type: 'LOAD_HEROES_LIST', heroes: result.data.data.results });
            })
            .catch(error => console.error(error));
    }, []);

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

    const findHeroes = (event) => {
        if (event.key === "Enter" && event.target.value) {
            HttpGet(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${event.target.value}`)
                .then(result => {
                    dispatch({ type: 'LOAD_HEROES_LIST', heroes: result.data.data.results })
                })
                .catch(error => console.error(error));
        }
    }

    function sortHeroes(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    function addRemoveFavorite(id) {
        // Remove if exists
        if (favorites.findIndex(favId => favId === id) > -1) {
            dispatch({ type: 'REMOVE_FAVORITE', id });
            return;
        }

        // Add
        if (favorites.length >= 5 ) {
            alert('Podem ser incluídos apenas 5 personagens na lista de favoritos.');
            return;
        }

        dispatch({ type: 'ADD_FAVORITE', id });
    }

    function getFavoriteIcon(id) {
        return favorites.findIndex(favId => favId === id) > -1 ? IconFavoriteOn : IconFavoriteOff;
    }

    return (
        <div className="main">
            <div className="main-header">
                <img src={Logo} alt="Logo Marvel" style={{ margin: '30px 0px' }} />
                <h1>EXPLORE O UNIVERSO</h1>
                <p>Mergulhe no domínio deslumbrante dos todos os personagens clássicos que você ama - e aqueles que você descobirá em breve!</p>
                <Search placeholder="Procure por heróis" style={{ backgroundColor: '#fdecec', margin: '30px 0px', width: '80%' }} onKeyDown={event => findHeroes(event)}></Search>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <div className="heroes-counter">{`Encontrados ${heroes.length || 0} heróis`}</div>
                    <div className="order-opt">
                        <img src={IconHero} onClick={event => { alert(`Favorito`); event.stopPropagation(); }} alt="Favoritar" />
                        Ordenar por nome - A/Z
                        <input type="checkbox" checked={showOrderned} onChange={e => setShowOrderned(e.target.checked)} ></input>
                    </div>
                    <div className="only-favorites">
                        <img src={IconFavoriteOn} onClick={event => { alert(`Favorito`); event.stopPropagation(); }} alt="Favoritar" />
                        Somente favoritos
                        <input type="checkbox" checked={favoritesOnly} onChange={e => setFavoritesOnly(e.target.checked)} ></input>
                    </div>
                </div>
                <ul className="heroes-list">
                    {
                        heroesMemo.map(hero => 
                            <li key={hero.id} className="hero-block" onClick={() => alert(`Detalhes: ${hero.id}`)}>
                                <div className="hero-thumbnail" style={{ backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})` }}></div>
                                <div className="hero-name">
                                    <img src={getFavoriteIcon(hero.id)} onClick={event => { addRemoveFavorite(hero.id); event.stopPropagation(); }} alt="Favoritar" />
                                    <p>{hero.name}</p>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}