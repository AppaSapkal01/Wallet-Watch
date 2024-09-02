import { BASE_URL } from '../../Utils/url'
import axios from 'axios';
import { getUserFromStorage } from "../../Utils/getUserFromStorage";

const token = getUserFromStorage();

export const loginAPI = async ({ email, password }) => {
    const res = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password
    });

    return res.data;
}

export const registerAPI = async ({ username, email, password }) => {
    const res = await axios.post(`${BASE_URL}/user/register`, {
        username,
        email,
        password
    });

    return res.data;
}

export const changePasswordAPI = async ({ newPassword }) => {
    console.log('new pass', newPassword)
    const res = await axios.put(`${BASE_URL}/user/change-password`, {
        newPassword
    },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    return res.data;
}

export const updateProfileAPI = async ({ email, username }) => {
    const res = await axios.put(`${BASE_URL}/user/update-user`, {
        email,
        username,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}