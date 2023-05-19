import axios from "axios"

export const get = async (limit: number, page: number) => {
    return await axios(`/api/books/get?limit=${limit}&&page=${page}`).then(res => res.data)
}

export const search = async (searchValue: string) => {
    return await axios.get(`/api/books/get/${searchValue}`).then(res => res.data)
}