import axios from "axios"
import { useRouter } from "next/router"

 


function AxiosProvider({ children }) {
    const { locale } = useRouter()
    axios.defaults.headers.common['locale'] = locale;
    return children
}


export default AxiosProvider