export class MyPattern {
  public static email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  public static link = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
  public static phone = '(([0]+[9])([0-9]{9})||([۰]+[۹])([۰-۹]{9}))$';
  public static tell = '(([0])([0-9]{10})||([۰])([۰-۹]{10}))$';
  public static nationalCode = '(([0-9]{10})||([۰-۹]{10}))$';
  public static faText = '[آا-ی ]+';
  public static date = '^(([0-9]{1})([.,\/]([0-9]{1,2})){0,1}|([۰-۹]{1})([.,\/]([۰-۹]{1,2})){0,1})';
  public static streetName = '[۰-۹-0-9آ-ی ]+';
  public static bankCard = '((([1-9])([0-9]{18})||([۱-۹])([۰-۹]{18}))||(([1-9])([0-9]{15})||([۱-۹])([۰-۹]{15})))$';
  public static shabaNumber = '(([1-9])([0-9]{23})||([۱-۹])([۰-۹]{23}))';
  public static bcNumber = '([1-9]{1}||[1-9]+[0-9]+||[۱-۹]{1}||[۱-۹]+[۰-۹]+)$'; // شماره شناسنامه
  public static password = '[-_/@!#$%^&*().A-Za-z0-9]{9,}';
  // public static password = "^(?=.\\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z])(?=.[!@#$%^&()+_\\-\\.]).{9,}$";
  public static smartCode = '[-_/@!#$%^&*().A-Za-z0-9۰-۹]+';
  public static userName = '[_.A-Za-z0-9]+';
  public static number = '^([0-9]*)$|^([۰-۹]*)$';
  public static EnNumber = '^([0-9]*)$';
  public static faNumberAndText = '[۰-۹]*|[آ-ی ]*';
  public static postalCode = '((([1-9]{1})([0-9]{9}))||(([۱-۹]{1})([۰-۹]{9})))$';
  public static DriverAndVehicleSmartCode = '(([0-9]{7})||([۰-۹]{7}))$';
  public static nameAndFamily = '([آائ-ی]+)+([آائ-ی ]+)+([آائ-ی])';
  public static enAndFaCharacter = '[0-9۰-۹A-Za-zآا-ی ]+';
  public static displayName = '^([a-zA-Z0-9\\_\\-\\.]{5,})$';
  // public static email = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
}
