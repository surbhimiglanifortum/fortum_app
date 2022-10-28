import axios from "axios";

export const postListService = async () => {
    try {
        let url = `https://stg-app-api-india.aws.fortum.com/api_app/locations/filter`
        return await axios.post(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log("Location List Error", error)
    }
}