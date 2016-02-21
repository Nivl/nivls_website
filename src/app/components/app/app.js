import {Component} from 'angular2/core';
import NavbarComponent from '../navbar/navbar';

import template from 'html!./app.html';

@Component({
    selector: 'my-app',
    template: template,
    directives: [NavbarComponent],
})

export class AppComponent { }
