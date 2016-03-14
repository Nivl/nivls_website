import { Directive, ElementRef } from 'angular2/core';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import 'highlight.js/styles/monokai-sublime.css';
import './markdown.scss';

@Directive({
  selector: 'ml-markdown',
  inputs  : ['data', 'protect'],
})

export default class MardownDirective {
  data; // @Input - Optional - Makdown to parse
  protect = false; // @Input - Optional - Set to true to block html

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
    if (this.protect !== false) {
      this.protect = true;
    }

    const md = new MarkdownIt({
      html       : this.protect,
      typographer: true,
      highlight  : (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {
            // do nothing
          }
        }

        return '';
      },
    });

    this.element.innerHTML = md.render(raw);
  }

  static get parameters() {
    return [[ElementRef]];
  }
}
