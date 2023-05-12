import axios from "axios"

export const get = async (limit: number, page: number) => {
    return await axios(`/api/get?limit=${limit}&&page=${page}`).then(res => res.data)
}

export const search = async (searchValue: string) => {
    return await axios.get(`/api/get/${searchValue}`).then(res => res.data)
}