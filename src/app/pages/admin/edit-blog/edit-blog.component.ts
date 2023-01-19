import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from 'src/app/utils/Base64Upload.js';
import { environment } from 'src/environments/environment';
import { EditBlogRequest } from './../../../core/models/EditBlogRequest';
import { EditBlogService } from './../../../services/admin/edit-blog/edit-blog.service';
import { AuthService } from './../../../services/auth/auth.service';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  fileUrl = environment.fileUrl;
  $form: EditBlogRequest = {
    id: '',
    title: '',
    image: undefined,
    description: ''
  }
  editorConfig = { extraPlugins: [Base64UploaderPlugin] }
  Editor = ClassicEditorBuild;
  imageSrc: any;
  error: string = '';
  enableSubmit: boolean = false;
  loading: boolean = true;
  imgTemp: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private _editBlog: EditBlogService,
    private _auth: AuthService,
    private _localStorage: LocalStorageService) {

  }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.params['id'];
    this._editBlog.loadBlog(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.$form.id = id;
        this.$form.title = res.title;
        this.$form.description = res.description;
        this.imgTemp = this.fileUrl + res.image;
      },
      error: (error) => {
        if (error.status == 401) {
          this._auth.refreshToken().subscribe({
            next: (res) => {
              this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
              this._editBlog.loadBlog(id).subscribe({
                next: (res) => {
                  this.loading = false;
                  this.$form.id = id;
                  this.$form.title = res.title;
                  this.$form.description = res.description;
                  this.imgTemp = this.fileUrl + res.image;
                }
              });
            },
            error: (error) => this.route.navigate(['/sign-in'])
          })
        }
        // this.route.navigate(['/404']);
      },
      complete: () => this.loading = false
    });
  }

  readURL(event: any): void {
    const files: FileList = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      if (file != null) {
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
        this.$form.image = file;
      }
    }
  }

  check() {
    this.enableSubmit = !(this.$form.title == '' || (this.$form.image == null && this.imgTemp == null) || this.$form.description == '');
  }

  update() {
    this.loading = true;
    if (this.enableSubmit && this.$form.image != null) {
      this._editBlog.update(this.$form, this.imgTemp).subscribe({
        next: (res) => {
          this.loading = false;
          this.route.navigate(['/admin/manage-blog'])
        },
        error: (error) => {
          if (error.status == 401) {
            this._auth.refreshToken().subscribe({
              next: (res) => {
                this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
                this._editBlog.update(this.$form, this.imgTemp).subscribe({
                  next: (res) => {
                    this.route.navigate(['/admin/manage-blog']);
                    this.loading = false;
                  }
                });
              },
              error: (error) => this.route.navigate(['/sign-in'])
            })
          }
          this.error = error.message;
        },
        complete: () => this.loading = false
      });
    }
  }
}
