import { Pipe } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe {

  transform(value, args) {
    if (!args) {
      return value;
    } else if (value) {
      return value.filter(item => {
        // tslint:disable-next-line:prefer-const
        for (let key in item) {
          if ((typeof item[key] === 'string' || item[key] instanceof String) &&
            (item[key].indexOf(args) !== -1)) {
        return true;
          }
        }
      });
    }
  }
}
