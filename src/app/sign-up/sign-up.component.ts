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
} from '@angular/fire/auth';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { NgForm } from '@angular/forms';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'ac-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private auth: Auth, private userService: UserService) {}

  ngOnInit(): void {}

  signup(form: NgForm): void {
    const { email, password } = form.value;
    this.userService.create(email, password);
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
}
