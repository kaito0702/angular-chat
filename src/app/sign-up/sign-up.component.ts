import { Component, OnInit } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ac-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(private router: Router, private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.showLoginButton = !isLoggedIn;
          this.showLogoutButton = isLoggedIn;
        });
    }
  }

  ngOnInit(): void {}

  signup(form: NgForm): void {
    const { email, password } = form.value;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((credential) => {
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${credential.user.email}`,
        };
        sendEmailVerification(credential.user, actionCodeSettings);
      })
      .then(() => this.router.navigateByUrl('/'));
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login_with_google() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  async login_with_facebook() {
    return await signInWithPopup(this.auth, new FacebookAuthProvider());
  }
  async login_with_twitter() {
    return await signInWithPopup(this.auth, new TwitterAuthProvider());
  }
  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    return await signOut(this.auth);
  }
}
