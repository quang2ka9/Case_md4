import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import { Post } from "./Post";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post)
    posts: Post[];
}
