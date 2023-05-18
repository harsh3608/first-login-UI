import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Login } from '../shared/user-models/user-models';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Login');
    this.loginForm = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    });
  }

  submitForm(){
    this.isLoading = true;
    setTimeout(() => {
      this.loginForm.markAllAsTouched();
      if (this.loginForm.valid) {
        this.loginRequest = this.loginForm.value;
        this.userService.loginUser(this.loginRequest).subscribe({
          next: (res) => {
            if(res.isSuccess && res.statusCode==200){
              console.log(res);
              this.toastr.success(res.message, 'Success!',{
                timeOut: 2000,
              });
              localStorage.setItem('token',res.response.token);
              this.router.navigate(['home']);
              this.isLoading = false;
            } 
            else if(!res.isSuccess && res.statusCode==500){
              console.log(res);
              this.isLoading = false;
              this.loginForm.reset();
              this.toastr.error(res.message, 'Failure!',{
                timeOut: 2000,
              });

            }
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
