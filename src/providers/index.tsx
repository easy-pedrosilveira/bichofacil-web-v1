import axios from 'axios';

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