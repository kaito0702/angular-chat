import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {}

  login(form: NgForm): void {
    const { email, password } = form.value;

    signInWithEmailAndPassword(this.auth, email, password).then(() =>
      this.router.navigateByUrl('/')
    );
  }
}
