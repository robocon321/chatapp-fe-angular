import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formSignUp!: FormGroup;
  signUp_messages = {
    email: [
      { type: 'required', message: 'Email is required'},
      { type: 'email', message: 'Enter a valid email'},
      { type: 'minlength', message: 'Email must be at least 8 characters long'}
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Password must be at least 8 characters long'}
    ],
    re_password: [
      { type: 'required', message: 'Re-password is required'},
      { type: 'match', message: 'Re-password must be match with password'}
    ]
  }

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formSignUp = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      re_password: ['', Validators.compose([Validators.required])]
    }, { validator: this.checkPassword});
    this.formSignUp.markAsPristine();
  }

  checkPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('re_password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  register() {
    console.log(this.formSignUp.value);
  }
}
