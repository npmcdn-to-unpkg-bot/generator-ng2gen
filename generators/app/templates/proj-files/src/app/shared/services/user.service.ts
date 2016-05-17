import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable()
export class UserService {

  getCurrent() {
    return new User(100000, 'jdoe', 'john', 'doe');
  }
}
