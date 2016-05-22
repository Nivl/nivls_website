import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import BlogListingComponent from '../../../blog/components/listing/listing';
import AboutComponent from '../../../about/components/about/about';
import ProjectListingComponent from '../../../projects/components/listing/listing';
import UserLoginComponent from '../../../users/components/login/login';

@Component({
  selector: 'ml-app',
  directives: [...ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS],
  styles: [require('normalize.css'), require('./app.scss')],
  template: require('./app.html'),
})
@Routes([
  { path: '/about', component: AboutComponent },
  { path: '/projects', component: ProjectListingComponent },
  { path: '/users/login', component: UserLoginComponent },
  { path: '/', component: BlogListingComponent },
])
export class AppComponent {
}
