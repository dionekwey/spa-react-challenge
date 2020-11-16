import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconFavoriteOn from '../assets/icones/heart/Path.svg';
import IconFavoriteOff from '../assets/icones/heart/Path Copy 2@1,5x.svg';

export default function Favorite(props) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

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
        <img 
            src={getFavoriteIcon(props.id)} 
            style={props.style}
            onClick={event => { event.stopPropagation(); addRemoveFavorite(props.id); }} 
            alt="Favoritar" />
    );
}