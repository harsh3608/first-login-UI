import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Login } from '../shared/user-models/user-models';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  public showPassword: boolean = false;
  loginRequest!: Login;
  isLoading: boolean = false;

  constructor(
    private title:Title,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Login');
    this.loginForm = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    });
  }

  submitForm(){
    debugger
    this.isLoading = true;
    setTimeout(() => {
      this.loginForm.markAllAsTouched();
      if (this.loginForm.valid) {
        this.loginRequest = this.loginForm.value;
        this.userService.loginUser(this.loginRequest).subscribe({
          next: (res) => {
            if(res){
              console.log(res);
              localStorage.setItem('token',res.token);
              this.router.navigate(['home']);
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err.error.detail);
            this.router.navigate(['/']);
          }
        });
      }
      
    }, 2000);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  //Getter functions to get for-values from form-controls
  get Email(): FormControl {
    return this.loginForm.get("Email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("Password") as FormControl;
  }
}
