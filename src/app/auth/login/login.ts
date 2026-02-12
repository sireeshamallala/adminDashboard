import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UrlsList } from '../../services/urlsList';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder);
  private ApiService = inject(ApiService);
  private UrlsList = inject(UrlsList);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })


  onSubmit() {
    if (this.loginForm.invalid) return;

    const payload = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.ApiService.login(this.UrlsList.loginUser, payload).subscribe({
      next: (res) => {
        if (res) {
          console.log('API RESPONSE:', res);
          sessionStorage.setItem('token', res.token);
          console.log('TOKEN AFTER SET:', sessionStorage.getItem('token'));
          this.router.navigate(['/dashboard']);

        }
      }, error(err) {
        console.error('Login failed', err)
      }
    });
  }

  test() {
    this.router.navigate(['/register']);

    console.log('clicked');
  }


}
