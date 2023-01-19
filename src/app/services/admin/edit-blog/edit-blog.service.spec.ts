/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditBlogService } from './edit-blog.service';

describe('Service: EditBllog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditBlogService]
    });
  });

  it('should ...', inject([EditBlogService], (service: EditBlogService) => {
    expect(service).toBeTruthy();
  }));
});
