import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { HttpGet } from '../components/HttpRequest';

import firebase from '../firebaseConnection';

export default function LoadList() {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.database().ref('favorites').once('value').then(snapshot => {
            snapshot.forEach((childItem) => {
                dispatch({ type: 'ADD_FAVORITE', id: childItem.val() });
            });
        });

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