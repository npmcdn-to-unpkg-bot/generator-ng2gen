import {Component} from '@angular/core';
import {UserService} from './../shared/index';
import {Configuration} from "../config";

@Component({
  selector: 'my-app',
  templateUrl: 'app.cmp.html'
})

export class AppComponent {
  name: string;
  employeeNumber: number;
  environment: string;

  constructor(private _userService: UserService) {
  }

  ngOnInit(){
    var user = this._userService.getCurrent();
    this.name = `${user.firstName} ${user.lastName}`;
    this.employeeNumber = user.id;
    this.environment = Configuration.ENVIRONMENT;
  }

}
