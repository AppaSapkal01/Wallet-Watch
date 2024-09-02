import { BASE_URL } from '../../Utils/url'
import axios from 'axios';
import { getUserFromStorage } from "../../Utils/getUserFromStorage";

const token = getUserFromStorage();


export const addTransactionsAPI = async ({
    type,
    category,
    date,
    description,
    amount
}) => {
    const res = await axios.post(`${BASE_URL}/transactions/create`, {
        type,
        category,
        date,
        description,
        amount
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const updateTransactionsAPI = async ({ type, id, category, amount, date, description }) => {
    const res = await axios.put(`${BASE_URL}/transactions/update/${id}`, {
        type,
        category,
        amount,
        date,
        description
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const deleteTransactionsAPI = async (id) => {
    const res = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
}

export const listTransactionsAPI = async ({ startDate, endDate, category, type }) => {
    const res = await axios.get(`${BASE_URL}/transactions/lists`, {
        params: { startDate, endDate, category, type },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}

export const getTransactionByIdAPI = async (id) => {
    const res = await axios.get(`${BASE_URL}/transactions/get-transaction/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log('get trans by id', res.data)
    return res.data;
};
