// Polyfill
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js');

require('!style!css!sass!normalize.css');
require('!style!css!sass!./client.scss');

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app/components/app/app';
import APIService from './app/services/api';

bootstrap(AppComponent, [HTTP_PROVIDERS, APIService]);
