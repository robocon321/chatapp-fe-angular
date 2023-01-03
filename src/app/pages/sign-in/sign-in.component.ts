import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formSignIn!: FormGroup;

  signIn_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' },
      { type: 'minlength', message: 'Email must be at least 8 characters long' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
    ],
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private signInService: SignInService) {
  }

  ngOnInit() {
    this.formSignIn = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.formSignIn.markAsPristine();
  }

  login() {
    this.signInService.login({
      username: this.formSignIn.get('email')?.value,
      password: this.formSignIn.get('password')?.value
    }).subscribe({
      next: res => console.log(res), 
      error: err => console.error(err)
    });
  }
  
}

