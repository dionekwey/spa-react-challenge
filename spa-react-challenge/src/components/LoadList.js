import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { HttpGet } from '../components/HttpRequest';

export default function LoadList() {
    const dispatch = useDispatch();

    useEffect(() => {
        HttpGet(`https://gateway.marvel.com/v1/public/characters`)
            .then(result => {
                dispatch({ type: 'LOAD_HEROES_LIST', heroes: result.data.data.results });
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <></>
    );
}