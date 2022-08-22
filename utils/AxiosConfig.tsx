import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router"
import React from "react";

 


function AxiosProvider({ children }) {
    const { locale, replace } = useRouter();
    
    React.useEffect(() => {
        axios.defaults.headers.common['locale'] = locale;
    }, [locale]);
    
    axios.interceptors.response.use((res) => res, (err: AxiosError) => {
        const unAuthCodes: any[] = [StatusCodes.NON_AUTHORITATIVE_INFORMATION, StatusCodes.UNAUTHORIZED];
        if (unAuthCodes.includes(err.code)) {
            return replace("/");
        };
        return Promise.reject(err);
    });
    return children;
};


export default AxiosProvider;