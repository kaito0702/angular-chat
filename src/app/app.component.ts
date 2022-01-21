import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <ac-header></ac-header>
    <ac-chat></ac-chat>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
