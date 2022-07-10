import {isNullOrUndefined} from 'util';

declare var $: any;

export class Toolkit {
  // ولیدیشن کد ملی
  public static checkCodeMeli(value) {
    const code = this.Fa2En(value);
    if (value.length >= 8) {
      const c = parseInt(code.substr(9, 1), 10);
      let s = 0;
      for (let i = 0; i < 9; i++) {
        s += parseInt(code.substr(i, 1), 10) * (10 - i);
      }
      s = s % 11;
      if ((s < 2 && c === s) || (s >= 2 && c === (11 - s))) {
        return true;
      }
    }
    return false;
  }

  // تبدیل اعداد فارسی به انگلیسی
  public static Fa2En(value: any): any {
    const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
    for (let i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
      value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    return value;
  }

  //  مقایسه تاریخ
  public static ToJalaliContainMonth (value: any) {
    let month: string;
    switch (value) {
      case '1':
        month = 'فروردین';
        break;
      case '2':
        month = 'اردیبهشت';
        break;
      case '3':
        month = 'خرداد';
        break;
      case '4':
        month = 'تیر';
        break;
      case '5':
        month = 'مرداد';
        break;
      case '6':
        month = 'شهریور';
        break;
      case '7':
        month = 'مهر';
        break;
      case '8':
        month = 'آبان';
        break;
      case '9':
        month = 'آذر';
        break;
      case '10':
        month = 'دی';
        break;
      case '11':
        month = 'بهمن';
        break;
      case '12':
        month = 'اسفند';
        break;
    }
    return month;
  }

  public static goToCrouselSlide(carouselSelector: string, slideNumber: number) {
    $(carouselSelector).carousel(slideNumber);
  }

  public static checkIsNullOrUndefined(value) {
    return isNullOrUndefined(value);
  }

  public static getSummary(text: string, length: number, extra?: string) {
    let exText = '';
    exText = !isNullOrUndefined(extra) ? ' ' + extra : '';
    // alert("exText: " + exText);
    return text.substr(0, length) + exText;
    // return text.substr(0,length,)+' '+ !isNullOrUndefined(extra) ? extra : "";
  }

  public static changeSelectedList(referenceList, selectedList, value: string[]) {
    selectedList = [];
    if (value !== null) {
      for (const item of value) {
        for (const refItem of referenceList) {
          if (refItem.id === item) {
            selectedList.push(refItem.id);

          }
        }
      }
    }
    return selectedList;
  }

  public static resetSelectedList(selector) {
    $(selector).val([]);
    $(selector).trigger('change');
  }
}
