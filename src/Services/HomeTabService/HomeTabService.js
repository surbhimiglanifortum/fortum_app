import axios from "axios";

export const postListService = async () => {
    let url = `https://stg-app-api-india.aws.fortum.com/api_app/locations/filter`
    return axios.post(url,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}