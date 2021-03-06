// import { Pipe } from '@angular/core';
//
// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe {
//
//   transform(value: any, args: string, ) {
//     if (!args) {
//       return value;
//     } else if (value) {
//       return value.filter(item => {
//         // tslint:disable-next-line:prefer-const
//         for (let key in item) {
//           if ((typeof item[key] === 'string' || item[key] instanceof String) &&
//             (item[key].indexOf(args) !== -1)) {
//         // return true;
//           }
//         }
//       });
//     }
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, county: string, propNameCounty: string, skill: string, propNameSkill1: string, propNameSkill2: string, propNameSkill3: string) {
    if (!value) {
      return value;
    }
     const resultArray = [];
     for( const item of value ) {
      if((county === 'Select a County') && (skill === 'Select a Skill')) {
        return value;
      }
        if((item[propNameCounty] === county || county === 'Select a County') && (item[propNameSkill1] === skill || item[propNameSkill2] === skill || item[propNameSkill3] === skill || skill === 'Select a Skill')) {
          resultArray.push(item)
        }
    }
    if(resultArray.length === 0) {
    }
    return resultArray
  }
}
