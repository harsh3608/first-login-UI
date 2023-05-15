import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registationForm!: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Registration');
    this.registationForm = this.fb.group({
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
    return this.registationForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.registationForm.get("password") as FormControl;
  }
}
