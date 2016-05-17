import {bootstrap} from '@angular/platform-browser-dynamic';
import {UserService} from './shared/index';
import {AppComponent} from './home/index';
import {Configuration} from "./config";

bootstrap(AppComponent, [UserService, Configuration]);
