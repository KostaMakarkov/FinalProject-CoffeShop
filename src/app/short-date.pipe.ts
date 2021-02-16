import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(value:string):string {
    if(value){
      let newString = value.substr(0,21);
      return newString;
    }
  }

}
