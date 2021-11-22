import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterKeyword: string): any {
    if (filterKeyword == '') {
      return value;
    }
    const filterdArr = value.filter((item) => {
      return item.name.includes(filterKeyword);
    });
    return filterdArr;
  }
}
