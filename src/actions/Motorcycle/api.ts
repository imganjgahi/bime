import axios from 'axios'

export const MotorCycleApi = {
    testApi: async () => {
        return await axios.get("https://jsonplaceholder.typicode.com/todos")
    }
}