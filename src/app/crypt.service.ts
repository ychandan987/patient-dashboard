import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable()
export class CryptService {

  constructor() { } 

  secretKey = 'srmarkaa@2018';
  
  store(key,value) {
    var encryptedData = crypto.AES.encrypt(value, this.secretKey).toString();
    sessionStorage.setItem(key, encryptedData);
  }

  get(key) {
      var encryptedData = sessionStorage.getItem(key);

      if((encryptedData != null) && (encryptedData != '')){
        return crypto.AES.decrypt(encryptedData, this.secretKey).toString(crypto.enc.Utf8);
      }
      return null;
  }

}