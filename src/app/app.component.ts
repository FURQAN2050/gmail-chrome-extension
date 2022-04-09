import { Component } from '@angular/core';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk/index';
import { BASE_URL, API_VERSION } from './base.url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gmail-chrome-extension';
  constructor(){
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
}
