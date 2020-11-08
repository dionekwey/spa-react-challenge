import React from 'react';
import Search from '../components/Search';

import Logo from '../assets/logo/Group.png';
import Favorite from '../assets/icones/heart/Path.png';

export default function Home() {
    return (
        <div className="main">
            <img src={Logo} alt="Logo Marvel" style={{ margin: '30px 0px' }} />
            <h1>EXPLORE O UNIVERSO</h1>
            <p>Mergulhe no domínio deslumbrante dos todos os personagens clássicos que você ama - e aqueles que você descobirá em breve!</p>
            <Search style={{ backgroundColor: '#fdecec' , margin: '30px 0px', width: '600px' }}></Search>

            <div className="top-panel">
                <span>Encontrados 5 heróis</span>
            </div>

            <div className="list">
                {
                    ['Hulk', 'Thor', 'Ironman', 'Spiderman', 'Ant-man'].map(item =>
                        <div className="item">
                            <img src="https://i2.wp.com/2centavos.com.br/wp-content/uploads/2013/05/thor.jpg" alt={item} />
                            <p className="item-name">
                                <span>{item}</span>
                                <img src={Favorite} alt="Favoritar" onClick={() => {}} />
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}