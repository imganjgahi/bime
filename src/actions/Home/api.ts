import axios from 'axios'

export const HomeApi = {
    testApi: async () => {
        return await axios.get("https://jsonplaceholder.typicode.com/todos")
    }
}