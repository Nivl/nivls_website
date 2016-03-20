import { Component } from 'angular2/core';
import Dropzone from 'dropzone';

import './dropzone.scss';
import template from 'html!./dropzone.html';

@Component({
  selector: 'ml-dropzone',
  inputs  : ['endpoint'],
  template,
})

export default class DropzoneComponent {
  endpoint; // @Input - Optional - endpoint to upload the picture
  _uniqueId = this._generateRandom(4);
  dropzoneId = `upload-dropzone-k${this._uniqueId}`;

  _generateRandom(len) {
    const allowedChars = 'abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';

    for (let i = 0; i < len; i++) {
      res += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    return res;
  }

  ngOnInit() {
    Dropzone.options[`uploadDropzoneK${this._uniqueId}`] = {
      paramName     : 'image',
      uploadMultiple: false,
      addRemoveLinks: true,
      init          : function() {
        this.on('addedfile', (file) => {
          console.log('added', file);
        });
      }
    };
  }
}
