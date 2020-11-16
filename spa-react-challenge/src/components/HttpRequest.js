import axios from 'axios';

class HttpRequest {
    static instance() {
        const instance = axios.create({
            params: {
                'apikey': '7edb1622ef4343dd804c55d510932e87',
                'Referrer': 'https://epic-wozniak-843c73.netlify.app/',
                'limit': '100'
            },
            timeout: 10000,
            method: 'get',
            responseType: 'json'
        });
        
        return instance;
    }

    async Get(urlApi, param = {}) {
        try {
            const get = HttpRequest.instance().get(urlApi, param);
            const result = await get;
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

var request = new HttpRequest();

export const HttpGet = async (urlApi, param = {}) => {
    return await request.Get(urlApi, param);
};