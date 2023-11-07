import axios from "axios";
import { baseURL } from "./const";

export async function createUser(data) {
    try {
        let response = await axios.post(baseURL + "/resource", data).then(response => response.data);
        if (response.status === 201) {
            return response;
        }
    } catch (error) {
        alert(error => error.message);
    }
}

export async function getAllUser() {
    try {
        let response = await axios.get(baseURL+"/resource").then(res => res.data);
        console.log(response);
        return response;
    } catch (error) {
        alert(error.message);
    }
}

export async function deleteUser(id) {
    try {
        let response = await axios.delete(baseURL + "/resource/" + id);
        return response;
    } catch (error) {
        alert(error.message);
    }
}

export async function updateUser(data) {
    try {
        let response = await axios.put(baseURL + "/resource/" + data.id, data);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

export async function getUserById(id) {
    try {
        let response = await axios.get(baseURL + "/resource" + id);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}