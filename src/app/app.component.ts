import { Component } from '@angular/core';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdIcon
  ],
  providers: [MdIconRegistry]
})
export class AppComponent {
  title = 'app works!';
}
