import React, { useEffect } from "react";
import { axiosPrivate, vecAxios } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          const tokensJSON = await AsyncStorage.getItem("Tokens");
          if (tokensJSON) {
            const parsedToken = JSON.parse(tokensJSON);
            if (parsedToken) {
              config.headers[
                "Authorization"
              ] = `Bearer ${parsedToken.accessToken}`;
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  });
  return axiosPrivate;
};

export const useVecSearchAxios = () => {
  useEffect(() => {
    const requestIntercept = vecAxios.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          const tokensJSON = await AsyncStorage.getItem("Tokens");
          if (tokensJSON) {
            const parsedToken = JSON.parse(tokensJSON);
            if (parsedToken) {
              config.headers[
                "Authorization"
              ] = `Bearer ${parsedToken.accessToken}`;
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      vecAxios.interceptors.request.eject(requestIntercept);
    };
  });
  return vecAxios;
};

export default useAxiosPrivate;
