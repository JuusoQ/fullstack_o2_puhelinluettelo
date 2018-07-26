import axios from 'axios'

// Tehtävä 2.15

// Tehtävä 3.9 - yhdistäminen backendiin 
const url = '/api/persons'

const getAll = () => {
    return axios.get(url).then(response => {return response.data })
}

const create = (newPerson) => {
    return axios.post(url, newPerson).then(response => {return response.data })
}

const update = (id, newPerson) => {
    console.log(id, 'ja uudet tiedot', newPerson)
    return axios.put(`${url}/${id}`,newPerson).then(response => {return response.data })
}

const remove = (id) => {
    console.log("Remove method called", id)
    return axios.delete(`${url}/${id}`).then(response => {return response.data })
}


export default {getAll, create, update,remove}