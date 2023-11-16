import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken?.access_token
        }
        return null;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.access_token);
    };
    return {
        setToken: saveToken,
        token
    }

}