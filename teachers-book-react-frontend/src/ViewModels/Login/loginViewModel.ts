import { BaseViewModel } from '../baseViewModel';

export class LoginViewModel implements BaseViewModel {

    public async login(username: string, password: string): Promise<boolean> {
        const accessToken = await this.getAccessTokenForLogin(username, password);
        return accessToken != null;
    }

    private async getAccessTokenForLogin(username: string, password: string): Promise<string> {
        let loginUser = null;
        let returnValue = null;
        try {
            loginUser = await jQuery.ajax({
                cache: false,
                data: {
                    "grant_type": "password",
                    "password": password,
                    "username": username
                },                
                type: "POST",
                url: "http://localhost:56117/token"
            });
        }
        catch(ex) {
            console.log(ex);
        }
        
        if(loginUser != null){
            returnValue = loginUser.access_token;
        }

        return returnValue;
    }
}