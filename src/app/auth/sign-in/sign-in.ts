import { Component, inject, resource } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UrlsList } from '../../services/urlsList';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {

  private fb = inject(FormBuilder);
  private ApiService = inject(ApiService);
  private UrlsList = inject(UrlsList);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

   onSubmitRegister(){
    if (this.registerForm.invalid) return;

    const payload = {
    name : this.registerForm.value.name!,  
    email: this.registerForm.value.email!, // ! tells TS it's not null
    password: this.registerForm.value.password!
  };

    this.ApiService.register(this.UrlsList.registerUser, payload).subscribe({next:(res) => {
      if(res){
        // this.registeredUsers = res;
        console.log('Logged in:', res);
        this.router.navigate(['/login']);
      }
    }, error(err){
       console.error('Login failed', err)
    }
  });
  }



}
