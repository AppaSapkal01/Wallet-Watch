import axios from 'axios';
import { getUserFromStorage } from "../../Utils/getUserFromStorage";

const BASE_URL = import.meta.env.VITE_API_URL;
const token = getUserFromStorage();


export const addCategoryAPI = async ({ name, type }) => {
    const res = await axios.post(`${BASE_URL}/categories/create`, {
        name,
        type
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const updateCategoryAPI = async ({ name, type, id }) => {
    const res = await axios.put(`${BASE_URL}/categories/update/${id}`, {
        name,
        type
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const deleteCategoryAPI = async (id) => {
    const res = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const listCategoriesAPI = async () => {
    const res = await axios.get(`${BASE_URL}/categories/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}