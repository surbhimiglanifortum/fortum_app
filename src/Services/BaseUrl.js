import axios from 'axios'
import appconfig from '../Utils/appconfig'
export default axios.create({
    baseURL:appconfig.BASE_URL
})