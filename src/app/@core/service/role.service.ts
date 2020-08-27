import {RestApiService} from '../mock/rest-api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RoleService {
  constructor(private http: RestApiService) {
  }

  getAllRole() {
    return this.http.get('/roles/getAllRoles');
  }

  doSearch(data, page, pageSize) {
    return this.http.post(`/roles/doSearch?page=${page}&pageSize=${pageSize}`, data);
  }

}
