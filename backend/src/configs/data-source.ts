import "reflect-metadata";
import {User} from "../models/User";
import {Category} from "../models/Category";
import {DataSource} from "typeorm";
import { Post } from "../models/Post";
import { Tag } from "../models/Tag";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "md4",
    synchronize: true,
    logging: false,
    entities: [User, Category, Comment, Post, Tag, Like],
    migrations: ["./dist/src/migrations/*.js"],
});

async function connectDB(){
    try{
        let connect = await AppDataSource.initialize();
        if(connect){
            console.log("Connect DB successfully");
        }else {
            console.log("Database connect error");
        }
    }catch (error){
        console.log(error)
    }
}

export {connectDB, AppDataSource}