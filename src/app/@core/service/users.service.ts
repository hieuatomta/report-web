import {RestApiService} from '../mock/rest-api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersService {
  constructor(private http: RestApiService) {
  }

  doSearch(data, page, pageSize) {
    return this.http.post(`/users/doSearch?page=${page}&pageSize=${pageSize}`, data);
  }
  update(data) {
    return this.http.post('/users/update', data);
  }
  insert(data) {
    return this.http.post('/users/insert', data);
  }
  delete(data) {
    return this.http.post('/users/delete', data);
  }
}
