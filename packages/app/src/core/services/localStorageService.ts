export default class LocalStorageService{
    
    static authKey: string = "auth";

    public getData<T>(key: string): T | null{
        let data = localStorage.getItem(key);
        if(data)
            return JSON.parse(data);
        else
            return null;
    }

    public setData<T>(key: string ,object: T): void{
        localStorage.setItem(key, JSON.stringify(object));
    }

    public removeItem(key: string): void{
        localStorage.removeItem(key);
    }
}

export let LocalStorageServiceSingleton = new LocalStorageService();