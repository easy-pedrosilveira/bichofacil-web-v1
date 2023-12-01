import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://54.76.180.109/api/v2'

export const apiRouteOpen = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: BASE_URL
})

// usar para rotas autenticadas (necessita que passe o token do const {token} = useAuthContext())
// exemplo => apiAuth.get("/user/", { headers: { 'Authorization': `Bearer ${token}` } })
export const apiAuth = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: BASE_URL
})

export const api = axios.create({ baseURL: 'http://52.30.254.27:8000/api/v2'});

export const apiProd = axios.create({ baseURL: 'https://api.ojogodosbichos.com/api/v2' });