import axios from 'axios';
const url = "https://games-directory-back.herokuapp.com/"

export const GamesController = {
    add(game) {
        return axios({
            method: 'POST',
            baseURL: url,
            url: 'games',
            data: game
        });
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: url,
            url: 'games'
        });
    },
    delete(idGame) {
        return axios({
            method: 'DELETE',
            baseURL: url,
            url: `games/${idGame}`
        });
    },
    update(game) {
        return axios({
            method: 'PUT',
            baseURL: url,
            url: `games`,
            data: game
        });
    }
}

