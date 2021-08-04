import axios, {AxiosResponse} from 'axios';


export interface PostResponse<T>{
    data: T | null;
    status: number;
}

class ApiService{
    static endPoint: string = "http://127.0.0.1:8000/";

    public async getData<T>(url: string, headers = {}) : Promise<T | null>{
        try{
            let response: AxiosResponse<T> = await axios.get<T>(
                ApiService.endPoint + url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...headers
                    },
                }
            );
            return response.data;
        }catch (e){
            console.log("error retrieving data");
            return null;
        }
    }

    public async postData<T>(url: string, body: any, headers = {}, contentType="application/json") : Promise<PostResponse<T> | null>{
        try{
            let response: AxiosResponse<T> = await axios.post<T>(
                ApiService.endPoint + url,
                body,
                {
                    headers: {
                        "Content-Type": contentType,
                        ...headers,
                    },
                }
            );
            
            let postResponse: PostResponse<T> = {
                data: response.data,
                status: response.status,
            }

            return postResponse;
        }catch (e){
            console.log("error retrieving data");
            return null;
        }
    }

    public async putData<T>(url: string, body: any, headers = {}, contentType="application/json") : Promise<PostResponse<T> | null>{
        try{
            let response: AxiosResponse<T> = await axios.put<T>(
                ApiService.endPoint + url,
                body,
                {
                    headers: {
                        "Content-Type": contentType,
                        ...headers,
                    },
                }
            );
            
            let postResponse: PostResponse<T> = {
                data: response.data,
                status: response.status,
            }

            return postResponse;
        }catch (e){
            console.log("error retrieving data");
            return null;
        }
    }

    public async deleteData<T>(url: string, headers = {}, contentType="application/json") : Promise<PostResponse<T> | null>{
        try{
            let response: AxiosResponse<T> = await axios.delete<T>(
                ApiService.endPoint + url,
                {
                    headers: {
                        "Content-Type": contentType,
                        ...headers,
                    },
                }
            );
            
            let postResponse: PostResponse<T> = {
                data: response.data,
                status: response.status,
            }

            return postResponse;
        }catch (e){
            console.log("error retrieving data");
            return null;
        }
    }
}

export default ApiService;
export let ApiServiceSingleton = new ApiService();