import config from "../config/config";
import { Client , Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);

    }
    async createPost({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log('Failed creating post ' , error)
        }
    }


    async updatePost( slug , {title ,  content , featuredImage , status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log('Failed updating post ', error)
        }
    }


    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId , 
                slug
            )
            return true
        } catch (error) {
            console.log('Failed deleting post ', error)
            return false
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Failed getting post ', error)
        }

    }

    async getAllPosts(queries = [Query.equal("status" ,"active")]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                
            )
        }catch(error){
            console.log('Failed getting posts ', error)
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Failed uploading file ', error)
            return false
        }
    }


    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Failed deleting file ', error)
            return false
        }
    }
}

const service = new Service();

export default service;
