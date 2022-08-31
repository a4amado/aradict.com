import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import React from 'react';

function useAxios() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorData, setErrorData] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(false);
  const [status, setStatus] = React.useState<StatusCodes>();

  async function call(config: AxiosRequestConfig) {
    try {
      setIsLoading(true);
      const res: AxiosResponse = await Axios(config);

      setData(res.data);
      setStatus(res.status);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setErrorData(error);
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isError,
    errorData,
    data,
    status,
    call
  };
}


export default useAxios;