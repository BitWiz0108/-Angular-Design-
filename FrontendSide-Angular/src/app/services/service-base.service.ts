import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {API_URL} from "../config/serverConfig";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {

  suffix = 'api/'
  prefix = '';

  constructor(public http: HttpClient) {
  }

  getService(path: string, queryParam?: any) {
    if (queryParam) {
      let params = new HttpParams({fromObject: queryParam});
      return this.http.get(API_URL + this.suffix + this.prefix + path, {params});
    } else {
      return this.http.get(API_URL + this.suffix + this.prefix + path);
    }
  }

  postService(path: string, body: any, queryParam?: any) {
    if (queryParam) {
      let params = new HttpParams({fromObject: queryParam});
      return this.http.post(API_URL + this.suffix + this.prefix + path, body, {params});
    } else {
      return this.http.post(API_URL + this.suffix + this.prefix + path, body);
    }
  }

  putService(path: string, body: any, queryParam?: any) {
    if (queryParam) {
      let params = new HttpParams({fromObject: queryParam});
      return this.http.put(API_URL + this.suffix + this.prefix + path, body, {params});
    } else {
      return this.http.put(API_URL + this.suffix + this.prefix + path, body);
    }
  }

  deleteService(path: string, queryParam?: any) {
    if (queryParam) {
      let params = new HttpParams({fromObject: queryParam});
      return this.http.delete(API_URL + this.suffix + this.prefix + path, {params});
    } else {
      return this.http.delete(API_URL + this.suffix + this.prefix + path);
    }
  }

  create(item: any, queryParam?: any): Observable<any> {
    return this.postService('', item, queryParam);
  }

  update(item: any, queryParam?: any): Observable<any> {
    return this.putService('/' + item.id , item, queryParam);
  }

  getOne(id: string, queryParam?: any): Observable<any> {
    return this.getService('/' + id, queryParam);
  }

  deleteOne(id: string, queryParam?: any): Observable<any> {
    return this.deleteService('/' + id, queryParam);
  }

  getAll(): Observable<any> {
    return this.getService('');
  }

}
