import { Component } from '@angular/core';
import {FlattenUnflattenService} from './flatten-unflatten.service'
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FlattenUnflattenService]
})
export class AppComponent {
  original = '';
  
  constructor(private FlattenUnflattenService: FlattenUnflattenService, private _snackbar: MdSnackBar){}

  format(){
    var theJSON = this.checkAndParseInput(this.original)
    if (theJSON) this.original = JSON.stringify(theJSON, null, 4);
  }
  runFlatten(){
    var theJSON = this.checkAndParseInput(this.original)
    if (theJSON) this.original = JSON.stringify(this.FlattenUnflattenService.flatten(theJSON), null, 4)
  }
  runUnFlatten(){
    var theJSON = this.checkAndParseInput(this.original)
    if (theJSON) this.original = JSON.stringify(this.FlattenUnflattenService.unFlatten(theJSON), null, 4)
  }
  checkAndParseInput(input){
    var a;
    try {
      a = JSON.parse(input);
      return a;
    }
    catch(e){
      this.alertWrongJSON();
      return false;
    }
    
  }
  alertWrongJSON(){
    this._snackbar.open('Invalid JSON!!!!', 'OK');

  }
  
    
}


