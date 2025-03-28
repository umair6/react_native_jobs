import { useState, useEffect } from "react";
import axios from "axios";
// import {RAPID_API_KEY} from '@env';

// const rapidApiKey  = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
          'x-rapidapi-key': '7726ee641emsh0232bd03743d154p1b5904jsn5dbcf4367df5',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };


      const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }
        catch(error){
            setError(error);
            alert("There is an error")
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
      }


      useEffect(() => {
        fetchData();
      }, []);
    
      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }

      return {data, isLoading, error, refetch};
}

export default useFetch