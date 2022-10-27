import axios from "axios";
import { computeDistance } from "../../Utils/helperFuncations/computeDistance";

export const postListService = async () => {
    let url = `https://stg-app-api-india.aws.fortum.com/api_app/locations/filter`
    const res = await axios.post(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    var locationsArray = res.data;
    // locationsArray.map((data, index) => {
    //     console.log(data, '............ggdata')
    //     locationsArray[index] = computeDistance([location.coords.latitude, location.coords.longitude], [
    //         data.latitude,
    //         data.longitude,
    //     ])
    // })
    // console.log("Check Location Array", locationsArray)
    // locationsArray.sort(function (a, b) { return a.distance - b.distance })
    return locationsArray;
}