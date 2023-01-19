import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { AuthService } from './../../../services/auth/auth.service';
import { CreateBlogRequest } from './../../../core/models/CreateBlogRequest';
import { CreateBlogService } from './../../../services/admin/create-blog/create-blog.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from 'src/app/utils/Base64Upload.js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  $form: CreateBlogRequest = {
    title: '',
    image: undefined,
    description: ''
  }
  editorConfig = { extraPlugins: [Base64UploaderPlugin]}  
  Editor = ClassicEditor;
  imageSrc: any;
  error: string = '';
  enableSubmit: boolean = false;
  loading: boolean = false;

  constructor(private route: Router, private _createBlog: CreateBlogService, private _auth: AuthService, private _localStorage: LocalStorageService) {

  }

  ngOnInit() {
  }

  readURL(event: any): void {
    const files: FileList = event.target.files;

    if (files && files[0]) {
        const file = files[0];
        if(file != null) {
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);        
          this.$form.image = file;
        }
    }
  }

  check() {
    this.enableSubmit = !(this.$form.title == '' || this.$form.image == null || this.$form.description == '');    
  }

  save() {
    this.loading = true;
    if(this.enableSubmit && this.$form.image != null) {
      this._createBlog.save(this.$form).subscribe({
        next: (res) => {
          this.loading = false;
          this.route.navigate(['/admin/manage-blog'])
        },
        error: (error) => {
          if(error.status == 401) {
            this._auth.refreshToken().subscribe({
              next: (res) => {
                this._localStorage.setUser({ ...this._localStorage.getUser(), token: res});
                this._createBlog.save(this.$form).subscribe({
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
