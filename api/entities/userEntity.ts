import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Users extends baseEntity {
    @Property({type: "string"})
    login!: string;

    @Property({type: "string"})
    email!: string;

    @Property({type: "string"})
    password!: string;

    @Property({type: "string"})
    address?: string;

    constructor(login: string, password: string, email: string, address: string) {
        super();
        this.login = login;
        this.password = password;
        this.email = email;
        this.address = address;
    }
}