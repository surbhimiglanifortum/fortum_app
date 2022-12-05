import axios from 'axios'
import appconfig from '../Utils/appconfig'
import { Auth } from 'aws-amplify'
export default axios.create({
    baseURL:appconfig.BASE_URL
})