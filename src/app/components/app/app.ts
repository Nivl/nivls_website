import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { MdToolbar } from '@angular2-material/toolbar';
import { MdAnchor } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import BlogListingComponent from '../../../blog/components/listing/listing';
import AboutComponent from '../../../about/components/about/about';
import ProjectListingComponent from '../../../projects/components/listing/listing';
import UserLoginComponent from '../../../users/components/login/login';

@Component({
  selector: 'ml-app',
  styles: [require('normalize.css'), require('./app.scss')],
  template: require('./app.html'),
  providers: [ROUTER_PROVIDERS, MdIconRegistry],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MdIcon,
    MdAnchor,
    MdToolbar,
  ],
})
@Routes([
  { path: '/about', component: AboutComponent },
  { path: '/projects', component: ProjectListingComponent },
  { path: '/users/login', component: UserLoginComponent },
  { path: '/', component: BlogListingComponent },
])
export class AppComponent {
}
