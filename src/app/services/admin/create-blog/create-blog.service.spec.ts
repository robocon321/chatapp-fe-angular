/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateBlogService } from './create-blog.service';

describe('Service: CreateBlog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateBlogService]
    });
  });

  it('should ...', inject([CreateBlogService], (service: CreateBlogService) => {
    expect(service).toBeTruthy();
  }));
});
