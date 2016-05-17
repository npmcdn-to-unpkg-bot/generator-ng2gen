import {User} from '../../app/shared/models/user';

export class UserCreator extends User {

    constructor(id=1, username='jdoe', firstName='john', lastName='doe') {
        super(id, username, firstName, lastName);
    }

    withFirstName(name: string) : User {
        this.firstName = name;
        return this;
    }
}

