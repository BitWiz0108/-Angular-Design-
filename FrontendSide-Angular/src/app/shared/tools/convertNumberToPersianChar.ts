export class ConvertNumberToPersianChar {
  public static string: string;
  public static convertToChar(n) {
    const m1 = n % 1000;
    const m2 = Math.floor(n / 1000) % 1000;
    const m3 = Math.floor(n / 1000000) % 1000;
    const m4 = Math.floor(n / 1000000000) % 1000;
    this.string = '';
    this.threeDigits(m4);

    if (m4 !== 0) {
      this.string += ' میلیارد ';
      if (m2 > 0 || m1 > 0 || m3 > 0) {
        this.string += ' و ';
      }
    }

    this.threeDigits(m3);
    if (m3 !== 0) {
      this.string += ' میلیون ';
      if (m2 > 0 || m1 > 0) {
        this.string += ' و ';
      }
    }
    this.threeDigits(m2);
    if (m2 !== 0) {
      this.string += ' هزار ';
      if (m1 > 0) {
        this.string += ' و ';
      }
    }
    this.threeDigits(m1);
    return this.string;
  }

  public static yekan(n) {
    switch (n) {
      case 1:
        this.string += ' یک ';
        break;
      case 2:
        this.string += ' دو';
        break;
      case 3:
        this.string += ' سه ';
        break;
      case 4:
        this.string += ' چهار';
        break;
      case 5:
        this.string += ' پنج ';
        break;
      case 6:
        this.string += ' شش ';
        break;
      case 7:
        this.string += ' هفت ';
        break;
      case 8:
        this.string += ' هشت ';
        break;
      case 9:
        this.string += ' نه ';
        break;
    }

  }

  public static dah(m) {

    switch (m) {
      case 2:
        this.string += ' بیست ';
        break;
      case 3:
        this.string += ' سی ';
        break;
      case 4:
        this.string += ' چهل ';
        break;
      case 5:
        this.string += ' پنجاه ';
        break;
      case 6:
        this.string += ' شصت ';
        break;
      case 7:
        this.string += ' هفتاد ';
        break;
      case 8:
        this.string += ' هشتاد ';
        break;
      case 9:
        this.string += ' نود ';
        break;

    }

  }

  public static sad(b) {
    switch (b) {
      case 1:
        this.string += ' صد ';
        break;
      case 2:
        this.string += ' دویست ';
        break;
      case 3:
        this.string += ' سیصد ';
        break;
      case 4:
        this.string += ' چهارصد ';
        break;
      case 5:
        this.string += ' پانصد ';
        break;
      case 6:
        this.string += ' ششصد ';
        break;
      case 7:
        this.string += ' هفتصد ';
        break;
      case 8:
        this.string += ' هشتصد ';
        break;
      case 9:;
        this.string += ' نه صد ';
        break;
    }


  }

  public static twoDigits(n) {
    switch (n) {
      case 10:
        this.string += 'ده';
        break;
      case 11:
        this.string += 'یازده';
        break;
      case 12:
        this.string += 'دوازده';
        break;
      case 13:
        this.string += 'سیزده';
        break;
      case 14:
        this.string += 'چهارده';
        break;
      case 15:
        this.string += 'پانزده';
        break;
      case 16:
        this.string += 'شانزده';
        break;
      case 17:
        this.string += 'هفده';
        break;
      case 18:
        this.string += 'هجده';
        break;
      case 19:
        this.string += 'نوزده';
        break;
      case 20:
        this.string += 'بیست';
        break;
      case 30:
        this.string += ' سی';
        break;
      case 40:
        this.string += ' چهل ';
        break;
      case 50:
        this.string += ' پنجاه ';
        break;
      case 60:
        this.string += ' شصت ';
        break;
      case 70:
        this.string += ' هفتاد ';
        break;
      case 80:
        this.string += ' هشتاد ';
        break;
      case 90:
        this.string += ' نود ';
        break;
      default:

        this.dah(Math.floor(n / 10) % 10);
        if ((Math.floor(n / 10) % 10) > 0 && n % 10 > 0) {
          this.string += ' و ';
        }
        this.yekan(n % 10);

    }
  }

  public static threeDigits(n) {
    this.sad(Math.floor(n / 100) % 10);
    if ((Math.floor(n / 100) % 10) > 0 && n % 100 > 0) {
       this.string += ' و ';
    }
    this.twoDigits(n % 100);
  }
}
