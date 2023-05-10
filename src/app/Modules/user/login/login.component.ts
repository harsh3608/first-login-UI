import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private title:Title,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Login');
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitForm(){

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  //Getter functions to get for-values from form-controls
  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
