import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from 'src/app/utils/Base64Upload.js';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  form = {
    title: '',
    image: null,
    description: ''
  }
  editorConfig = { extraPlugins: [Base64UploaderPlugin]}  
  Editor = ClassicEditor;
  imageSrc: any;

  constructor() { 
  }

  ngOnInit() {
  }

  readURL(event: any): void {
    const files: FileList = event.target.files;

    if (files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }
}
