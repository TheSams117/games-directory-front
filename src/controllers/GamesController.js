import axios from 'axios';

export const GamesController = {
    add(game) {
        return axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_API,
            url: 'games',
            data: game
        });
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_API,
            url: 'games'
        });
    },
    delete(idGame) {
        return axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_API,
            url: `games/${idGame}`
        });
    },
    update(game) {
        return axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_API,
            url: `games`,
            data: game
        });
    }
}

