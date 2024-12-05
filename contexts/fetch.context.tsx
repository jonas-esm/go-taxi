'use client'
import type { FC, ReactNode } from 'react'
import React, { createContext, useMemo } from 'react'

import type {

  // AxiosError,
  AxiosInstance
} from 'axios'
import axios from 'axios'

// const API_URL = envConfig.NEXT_PUBLIC_BASE_URL

interface AuthResponse {
  token: string
  refreshToken: string
}

type FetchContextInterface = {
  api: AxiosInstance
}

// type CreateInstanceParams = {
//     url: string;
//     token?: string;
//     refreshToken?: string;
//     callback: (authData: AuthResponse) => void;
//     logout: () => void;
//     companyId: string;
// };

export const FetchContext = createContext<FetchContextInterface | null>(null)

const createInstance = () => {
  const instance = axios.create()

  instance.interceptors.request.use(
    config => {
      const axiosConfig = {
        ...config
      }

      // if (token) {
      //     axiosConfig.headers["Authorization"] = `Bearer ${token}`;
      //     axiosConfig.headers["company-id"] = companyId;
      // }

      return axiosConfig
    },
    async error => await Promise.reject(error)
  )

  //   instance.interceptors.response.use(
  //     res => res?.data,
  //     async (error: AxiosError) => {
  //       if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
  //         // TODO: handle if user offline

  //         return
  //       }

  //       if (error.response?.status === 401) {
  //         if (!refreshToken) {
  //           return logout()
  //         }

  //         try {
  //           const response = await new Promise<AuthResponse>((resolve, reject) => {
  //             // TODO: call refresh token API

  //             reject('not done')
  //           })

  //           callback(response as AuthResponse)

  //           const config = error.config

  //           if (!config) {
  //             throw error
  //           }

  //           return instance(config)
  //         } catch (e) {
  //           logout()
  //         }
  //       }

  //       return await Promise.reject(error?.response?.data)
  //     }
  //   )

  return instance
}

export const FetchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const refreshToken = "";

  const api = useMemo(() => {
    return createInstance()
  }, [])

  const contextValue = useMemo(() => ({ api }), [api])

  return <FetchContext.Provider value={contextValue}>{children}</FetchContext.Provider>
}
