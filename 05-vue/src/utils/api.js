import axios from "axios";

const BASE_API = "http://localhost:3000/notes/";

export const deleteItem = id => axios.delete(BASE_API + id);
export const updateItem = (id, props) => axios.patch(BASE_API + id, props);
export const addItem = item => axios.post(BASE_API, item);
export const getItems = () => axios.get(BASE_API);
