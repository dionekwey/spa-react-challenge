import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HttpGet } from '../components/HttpRequest';

import Icon from '../assets/busca/Lupa/Shape.png';

export default function Search(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const InputSearch = styled.input.attrs({ type: 'search' })`
        background-image: url(${Icon});
        background-position: 10px 10px; 
        background-repeat: no-repeat;
        border: none;
        border-radius: 25px;
        box-sizing: border-box;
        font-size: 14px;
        padding: 12px 20px 12px 40px;
    `;

    function findHeroes(event) {
        if (event.key === "Enter" && event.target.value) {
            HttpGet(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${event.target.value}`)
                .then(result => {
                    history.push('/');
                    dispatch({ type: 'LOAD_HEROES_LIST', heroes: result.data.data.results });
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <InputSearch {...props} onKeyDown={event => findHeroes(event)} />
    );

}



