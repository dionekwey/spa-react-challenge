import axios from 'axios';

class HttpRequest {
    static instance() {
        const instance = axios.create({
            params: {
                'ts': '1',
                'apikey': '574228587f34b6cdc0304de1f08c218b',
                'hash': 'ec4d7844bf3c4af0d5cc523426403cf7',
                'limit': '100'
            },
            Headers: {
                'Accept': '*/*'
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