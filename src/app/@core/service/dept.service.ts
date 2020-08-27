import {RestApiService} from '../mock/rest-api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DeptService {
  constructor(private http: RestApiService) {
  }

  getAllDept() {
    return this.http.get('/depts/getAllDepts');
  }
}
