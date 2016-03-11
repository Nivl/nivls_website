import { Directive, ElementRef, EventEmitter } from 'angular2/core';

import Showdown from 'showdown';
import 'showdown-prettify';

import './markdown.scss';

@Directive({
  selector: 'ml-markdown',
  inputs  : ['data'],
})

export default class MardownDirective {
  constructor(elementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnChanges(changes) {
    const data = (changes.data.currentValue) ? (changes.data.currentValue) : ('');
    this.parse(data);
  }

  ngOnInit() {
    let raw = this.element.innerHTML;

    if (this.data) {
      raw = this.data;
    } else {
      raw = this.element.innerHTML;
    }

    if (raw) {
      this.parse(raw);
    }
  }

  parse(raw) {
    const html = new Showdown.Converter({ extensions: ['prettify'] }).makeHtml(raw);
    this.element.innerHTML = html;
    prettyPrint();
  }

  static get parameters() {
    return [[ElementRef]];
  }
}
