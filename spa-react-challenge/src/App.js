import React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { Footer } from './components/Footer';
import LoadList from './components/LoadList';

export default function App() {

    return (
        <Provider store={store}>
            <LoadList />
            <Routes />
            <Footer />
        </Provider>
    );

}