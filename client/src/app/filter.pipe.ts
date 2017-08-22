import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: string, propName: string): any {
    if(!args) {
      return value;
    }
      const resultArray = [];
      for(const item of value) {
        if (typeof item[propName] === 'string' && item[propName] instanceof String) {
          resultArray.push(item);
          }
         else if(item[propName] === args) {
           resultArray.push(item);
         }
        }
        return resultArray;
      }
    }


    // export class FilterPipe implements PipeTransform {
    //   transform(value: any, args: string, propName: string): any {
    //     if(!args) {
    //       return value;
    //     }
    //       const resultArray = [];
    //       for(const item of value) {
    //         if (typeof item[propName] === 'string' && item[propName] instanceof String) {
    //           resultArray.push(item);
    //           }
    //          else if(item[propName] === args) {
    //            resultArray.push(item);
    //          }
    //         }
    //         return resultArray;
    //       }
    //     }
