import axios from "axios"



export const getListsSong = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    return result
}