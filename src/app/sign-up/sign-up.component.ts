import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,10}$/), Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', Validators.required]
    })
  }

  onSubmit(form: FormGroup) {

    if(form.valid){
      this.router.navigate([''])
    }

  }

}
