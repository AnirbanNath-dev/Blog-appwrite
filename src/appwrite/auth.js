import config from "../config/config";
import { Client , Account , ID } from "appwrite";

export class AuthService {

    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)

    }

    async createAccount({email , password , name}) {

        try {

            const userAccount = await this.account.create(ID.unique() , email,password , name)
            if(userAccount){
                
            }
            else{
                return userAccount
            }
        } catch (error){
            throw error
            
        }

    }

    async login({email, password}){
        try {
            await this.
        } catch (error) {
            
        }
    }

}

const authService = new AuthService();

export default authService