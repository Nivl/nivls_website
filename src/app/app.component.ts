import { Component } from '@angular/core';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MD_TOOLBAR_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})
export class AppComponent {
  title = 'app works!';
}
