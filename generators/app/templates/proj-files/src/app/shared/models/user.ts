'use strict';

export class User {
    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;

    constructor(id=0, username='', firstName='', lastName='') {
        this.id = id;
        this.username= username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}