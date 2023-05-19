import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/services/user.service';
import { UserRegister } from '../shared/user-models/user-models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registationForm!: FormGroup;
  public showPassword: boolean = false;
  isLoading: boolean=false;
  userAddRequest!: UserRegister;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Registration');
    this.registationForm = this.fb.group({
      PersonName: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      ConfirmPassword: new FormControl('', [Validators.required])
    });

  }

  submitForm(){
    this.isLoading = true;
    setTimeout(() => {
      this.registationForm.markAllAsTouched();
      if (this.registationForm.valid) {
        this.userAddRequest = this.registationForm.value;
        this.userService.registerUser(this.userAddRequest).subscribe({
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
              this.registationForm.reset();
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
  get PersonName(): FormControl {
    return this.registationForm.get("PersonName") as FormControl;
  }
  get Gender(): FormControl {
    return this.registationForm.get("Gender") as FormControl;
  }
  get Email(): FormControl {
    return this.registationForm.get("Email") as FormControl;
  }
  get PhoneNumber(): FormControl {
    return this.registationForm.get("PhoneNumber") as FormControl;
  }
  get Password(): FormControl {
    return this.registationForm.get("Password") as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registationForm.get("ConfirmPassword") as FormControl;
  }
}
