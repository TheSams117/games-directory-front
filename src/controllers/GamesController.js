import axios from 'axios';

export const GamesController = {
    add(game) {
        return axios({
            method: 'POST',
            baseURL: process.env.API,
            url: 'games',
            headers:{
                'Content-Type': 'application/json'
            },
            data: game
        });
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: process.env.API,
            url: 'games'
        });
    },
    delete(idGame) {
        return axios({
            method: 'DELETE',
            baseURL: process.env.API,
            url: `games/${idGame}`
        });
    },
    update(game) {
        return axios({
            method: 'PUT',
            baseURL: process.env.API,
            url: `games`,
            headers:{
                'Content-Type': 'application/json'
            },
            data: game
        });
    }
}
