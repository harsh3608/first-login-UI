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
  genderOptions: string[] = ['Male','Female','Other'];

  constructor(
    private title: Title,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Registration');
    this.registationForm = this.fb.group({
      Name: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
      
    });

  }

  submitForm(){

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  //Getter functions to get for-values from form-controls
  get Name(): FormControl {
    return this.registationForm.get("email") as FormControl;
  }
  get Gender(): FormControl {
    return this.registationForm.get("password") as FormControl;
  }
  get Email(): FormControl {
    return this.registationForm.get("email") as FormControl;
  }
  get Phone(): FormControl {
    return this.registationForm.get("password") as FormControl;
  }
  get Password(): FormControl {
    return this.registationForm.get("email") as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registationForm.get("password") as FormControl;
  }
}
