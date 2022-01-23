import { Component, OnInit } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import { Auth, getAuth, NextOrObserver, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null;

  constructor(private auth: Auth, private router: Router) {
    this.currentUser = this.auth.currentUser;
  }

  ngOnInit(): void {}

  logout(): void {
    this.auth.signOut().then(() => this.router.navigateByUrl('/login'));
  }
}
