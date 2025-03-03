import { Injectable } from "@angular/core";

@Injectable()
export class SessionStorageServiceClass {
    constructor() {
    }
    /**
     * Set the data according to given parameter
     * @param  {string} module
     * @param  {string} key
     * @param  {any} data
     */
    public setSessionData(module: string, key: string, data: any) {
        // this.removeSessionData(module , key);
        let modObj = JSON.parse(sessionStorage.getItem(module)!);
        if (modObj == undefined) {
            modObj = {};
        }
        modObj[key] = data;
        sessionStorage.setItem(module, JSON.stringify(modObj));
    }
    /**
     * Retrive module from sessionStorage
     * @param  {string} module
     * @param  {string} key
     */
    public getSessionData(module: string, key: string) {
        let modObj = JSON.parse(sessionStorage.getItem(module)!);
        if (modObj == undefined) {
            modObj = {};
            sessionStorage.setItem(module, JSON.stringify(modObj));
        }
        if (key != undefined) return modObj[key];
        return modObj;
    }
    /**
     * Remove module from sessionStorage
     * @param  {string} module
     * @param  {string} key
     */
    public removeSessionData(module: string, key: string) {
        if (key != undefined) {
            const modObj = JSON.parse(sessionStorage.getItem(module)!);
            if (modObj != undefined) {
                delete modObj[key];
                sessionStorage.setItem(module, JSON.stringify(modObj));
                return;
            }
        }
        sessionStorage.removeItem(module);
    }
}
