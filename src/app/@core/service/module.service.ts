import {RestApiService} from '../mock/rest-api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ModuleService {
  constructor(private http: RestApiService) {
  }

  doSearch(data, page, pageSize) {
    return this.http.post(`/module/doSearch?page=${page}&pageSize=${pageSize}`, data);
  }
  update(data) {
    return this.http.post('/module/update', data);
  }
  insert(data) {
    return this.http.post('/module/insert', data);
  }
  delete(data) {
    return this.http.post('/module/delete', data);
  }
  getParent() {
    return this.http.post('/module/getParent', {});
  }
  getAllModule() {
    return this.http.get('/module/getAllModule');
  }
}
