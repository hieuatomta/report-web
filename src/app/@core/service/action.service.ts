import {RestApiService} from '../mock/rest-api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ActionService {
  constructor(private http: RestApiService) {
  }

  doSearch(data, page, pageSize) {
    return this.http.post(`/action/doSearch?page=${page}&pageSize=${pageSize}`, data);
  }
  delete(data) {
    return this.http.post('/action/delete', data);
  }
  update(data) {
    return this.http.post('/action/update', data);
  }
  insert(data) {
    return this.http.post('/action/insert', data);
  }
}
