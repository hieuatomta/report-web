import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { delay, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {

  protected onCollapse$ = new BehaviorSubject<boolean>(false);
  onCollapse = this.onCollapse$.asObservable();
  protected layoutSize$ = new Subject();
  protected layoutSizeChange$ = this.layoutSize$.pipe(
    shareReplay({ refCount: true }),
  );

  changeOnCollapse(value: boolean) {
    this.onCollapse$.next(value);
  }

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(delay(1));
  }

  onSafeChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(
      debounceTime(350),
    );
  }
}
