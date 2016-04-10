import { Component, ElementRef } from 'angular2/core';
import { NgClass } from 'angular2/common';
import { Router } from 'angular2/router';

import UserManager from '../../models/user/user-manager';

import 'animate.css';
import './login.scss';
import template from 'html!./login.html';

@Component({
  selector  : 'ml-login',
  providers : [UserManager],
  directives: [NgClass],
  template,
})

export default class UserLoginComponent {
  email;
  password;
  error = false;
  _userManager;
  _elementRef;
  _router;

  constructor(userManager, elementRef, router) {
    this._userManager = userManager;
    this._elementRef = elementRef;
    this._router = router;

    if (userManager.isLogged()) {
      this._router.navigate(['Blog']);
    }
  }

  async login() {
    this.error = false;

    try {
      await this._userManager.login(this.email, this.password);
      this._router.navigate(['Blog']);
    } catch (e) {
      this.error = true;
    }
  }

  static get parameters() {
    return [[UserManager], [ElementRef], [Router]];
  }
}
