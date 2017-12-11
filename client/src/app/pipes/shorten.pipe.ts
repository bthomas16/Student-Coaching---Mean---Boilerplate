import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number) {
    console.log(value.length, 'this is the length')
    if(value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }

}
