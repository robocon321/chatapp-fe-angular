import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRequest } from './../../../core/models/PageRequest';
import { BlogService } from './../../../services/admin/blog/blog.service';
import { AuthService } from './../../../services/auth/auth.service';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  pageRequest: PageRequest = new PageRequest();
  blogs: any[] = [];
  loading: boolean = true;
  error: string = 'Hewll';

  totalElements: number = 0;
  totalPages: number = 0;
  pageIndex: number = 0;
  
  title: string = '';

  constructor(
    private _blog: BlogService,
    private route: Router,
    private _localStorage: LocalStorageService,
    private _auth: AuthService,
    private activatedRoute: ActivatedRoute) {
    var params = { ...this.activatedRoute.snapshot.queryParams };
    this.pageRequest.pageable.page = params['page'] ? params['page'] : 0;
    this.pageRequest.pageable.size = params['size'] ? params['size'] : 2;
    this.pageRequest.pageable.sort = params['sort'] ? params['sort'] : 'title,asc';
    this.title = params['title'];
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    var filter = this.toFilter();
    this.loading = true;
    this._blog.loadBlog(this.pageRequest, filter).subscribe({
      next: (res) => {
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.pageIndex = res.number + 1;
        this.blogs = res.content;
        this.loading = false;
      },
      error: (error) => {
        if (error.status == 401) {
          this._auth.refreshToken().subscribe({
            next: (res) => {
              this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
              this._blog.loadBlog(this.pageRequest, filter).subscribe({
                next: (res) => {
                  this.totalElements = res.totalElements;
                  this.totalPages = res.totalPages;
                  this.pageIndex = res.number + 1;
                  this.blogs = res.content;
                  this.loading = false;
                }
              });
            },
            error: (error) => this.route.navigate(['/sign-in'])
          })
        } else {
          this.loading = false;
          this.error = error.message;
        }
      },

    })
  }

  changePage(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.pageRequest.pageable.page = pageIndex;
    this.route.navigate(['admin', 'manage-blog'], { queryParams: { ...this.activatedRoute.snapshot.queryParams, ...this.pageRequest.pageable } });
    this.loadPage();
  }

  toFilter(): any {
    var obj: any = {};
    if(this.title != '' && this.title) {
      obj['title'] = this.title;
    }
    return obj;
  }

  submitSearch() {
    var filter = this.toFilter();
    this.route.navigate(['admin', 'manage-blog'], { queryParams: { ...filter } });
    this.loadPage();
  }

  deleteBlog(id: string) {
    this.loading = true;
    this._blog.deleteBlog(id).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (error) => {
        if (error.status == 401) {
          this._auth.refreshToken().subscribe({
            next: (res) => {
              this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
              this._blog.deleteBlog(id).subscribe({
                next: (res) => {
                  this.loadPage();
                }
              });
            },
            error: (error) => this.route.navigate(['/sign-in'])
          })
        } else {
          this.loading = false;
          this.error = error.message;
        }
      },

    })

  }
}

