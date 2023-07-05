import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN, REGISTER } from 'src/app/constants/message.constant';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { matchValidator } from 'src/app/utils/match-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  currentForm!: FormGroup;

  isLoginMode = true;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      remember: [false],
    });

    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      },
      { validators: matchValidator('password', 'confirmPassword') }
    );

    this.currentForm = this.loginForm;

    this.loginForm.controls['username'].setValue('admin');
    this.loginForm.controls['password'].setValue('123');
  }

  onSubmit() {
    if (!this.currentForm.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.onLogin();
    } else {
      this.onRegister();
    }
  }

  onLogin() {
    const username = this.currentForm.controls['username'].value;
    const password = this.currentForm.controls['password'].value;

    this.isLoading = true;
    this.authService.login(username, password).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        if (user) {
          this.router.navigate(['blog']);
        } else {
          this.dialogService.openInfoDialog('Information', LOGIN.WRONG);
        }
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  onRegister() {
    const username = this.currentForm.controls['username'].value;
    const password = this.currentForm.controls['password'].value;
    const confirmPassword = this.currentForm.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      return;
    }
    this.isLoading = true;
    this.userService.register(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogService.openInfoDialog('Information', REGISTER.SUCCESS);
        this.changeToLogin();
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 500) {
          this.dialogService.openInfoDialog('Information', error.error.message);
        }
      },
    });
  }

  changeToLogin() {
    this.isLoginMode = true;
    this.currentForm = this.loginForm;
  }

  changeToRegister() {
    this.isLoginMode = false;
    this.currentForm = this.registerForm;
  }
}
