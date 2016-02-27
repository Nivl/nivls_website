import { Component } from 'angular2/core';
import NavbarComponent from '../navbar/navbar';

import './material.min.css';
import './app.scss';

import template from 'html!./app.html';

@Component({
  selector  : 'my-app',
  directives: [NavbarComponent],
  template,

})

export class AppComponent {
 }
