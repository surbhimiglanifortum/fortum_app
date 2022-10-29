import axios from "axios";

export const postListService = async (payload) => {
    try {
        let url = `https://stg-app-api-india.aws.fortum.com/api_app/locations/filter`
        return await axios.post(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        },payload)
    } catch (error) {
        console.log("Location List Error", error)
    }
}