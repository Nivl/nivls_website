import { Component } from 'angular2/core';
import NavbarComponent from '../navbar/navbar';

import 'material-design-lite'

import './material.min.css';
import './app.scss';

import template from 'html!./app.html';

@Component({
  selector  : 'ml-app',
  directives: [NavbarComponent],
  template,

})

export class AppComponent {
 }
