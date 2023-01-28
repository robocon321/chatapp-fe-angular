/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RxStompService } from './rx-stomp.service';

describe('Service: RxStomp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxStompService]
    });
  });

  it('should ...', inject([RxStompService], (service: RxStompService) => {
    expect(service).toBeTruthy();
  }));
});
