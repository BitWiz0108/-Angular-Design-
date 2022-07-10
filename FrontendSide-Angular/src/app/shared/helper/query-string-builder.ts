import { isNullOrUndefined } from 'util';

export class QueryStringBuilder {

  public static Build(state: any): string {
    if (isNullOrUndefined(state)) {
      return '';
    }
    const queryStringItems: string[] = [];
    if (!isNullOrUndefined(state.authorization) && state.authorization !== '') {
      queryStringItems.push('Authorization=' + state.authorization );
    }

    if (!isNullOrUndefined(state.captchaValue) && state.captchaValue !== '') {
      queryStringItems.push('captchaValue=' + state.captchaValue );
    }
    if (!isNullOrUndefined(state.captchaCode) && state.captchaCode !== '') {
      queryStringItems.push('captchaCode=' + state.captchaCode );
    }

    let queryString = '';
    if (queryStringItems.length > 0) {
      queryString += '?';
      // tslint:disable-next-line:forin
      for (const i in queryStringItems ) {
        queryString += queryStringItems[i];
        if (+i < queryStringItems.length - 1) {
          queryString += '&';
        }
      }
    }

    // queryStringItems = [];
    return queryString;
  }


}
