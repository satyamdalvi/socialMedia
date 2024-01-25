import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import data  from '../../assets/data/staticData.json';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private cookie: CookieService, 
    private userService: UserService
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    })
  }

  onSubmit(form: FormGroup) {
    if(form.valid){
      this.cookie.set('loggedIn', 'true')
      localStorage.setItem('postData', JSON.stringify(data))
      this.userService.customData = data
      this.router.navigate(['dashboard']);
    }
  }

  navigateToSignUp(){
    this.router.navigate(['/sign-up']) 
  }


}
