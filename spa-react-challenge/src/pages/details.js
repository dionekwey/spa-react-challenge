import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { HttpGet } from '../components/HttpRequest';
import Search from '../components/Search';
import Favorite from '../components/Favorite';

import Logo from '../assets/logo/Group.png';
import IconBook from '../assets/icones/book/Group@1,5x.svg';
import IconMovie from '../assets/icones/video/Shape@1,5x.svg';

export default function Details(props) {
    const hero = useSelector(state => state.heroes.filter(item => item.id === Number(props.match.params.id))[0]);
    const favorites = useSelector(state => state.favorites);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        if (hero === undefined) {
            return [];
        }

        HttpGet(`https://gateway.marvel.com/v1/public/characters/${hero.id}/comics?hasDigitalIssue=true&limit=10`)
            .then(result => {
                setComics(result.data.data.results);
            })
            .catch(error => {
                console.error(error);
                setComics([]);
            });
    }, [hero]);

    return (
        <div className="details">
            <div className="details-header">
                <img src={Logo} style={{ height: '40px', margin: '20px', mixBlendMode: 'multiply' }} alt="Logo Marvel" />
                <Search placeholder="Procure por heróis" style={{ margin: '20px', width: '40%' }}></Search>
            </div>
            {
                hero &&
                <div className="info">
                    <div className="text">
                        <h1>
                            <Favorite id={hero.id} style={{ cursor: 'pointer', float: 'right', height: '22px' }} />
                            {hero.name}
                        </h1>
                        <p>{hero.description}</p>
                        <div className="statistics">
                            <div>
                                <p><b>Quadrinhos</b></p>
                                <p><img src={IconBook} /><b>{hero.comics.available}</b></p>
                            </div>
                            <div>
                                <p><b>Filmes</b></p>
                                <p><img src={IconMovie} /><b>{hero.series.available}</b></p>
                            </div>
                        </div>
                        <p><b>Último quadrinho:</b> {new Date(hero.modified).toLocaleDateString('pt-br', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="photo">
                        <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} width="100%" alt="Foto" />
                    </div>
                </div>
            }
            {
                hero &&
                <div className="comics">
                    <h3>Últimos lançamentos</h3>
                    <ul className="list">
                        {
                            comics.map(comic => 
                                <li key={comic.id} className="comic">
                                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} style={{ height: '150px' }} alt="Foto" />
                                    <p>{comic.title}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    );
}