import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  DocumentReference,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { where } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { filter, map, Observable } from 'rxjs';
import { User, userConverter } from 'src/app/class/user';
import { Location } from '@angular/common';

@Component({
  selector: 'ac-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private route: Router,
    private firestore: Firestore,
    private location: Location
  ) {
    const url = this.route.url;
    const id = url.replace('/users/', '');

    const users = query(
      collection(firestore, 'users'),
      where('uid', '==', id)
    ).withConverter(userConverter);

    this.user$ = collectionData(users).pipe(
      map((users) => {
        const user = users.filter((user) => user.uid === id)[0];
        return user;
      })
    );
  }

  ngOnInit(): void {}

  goBack(event: MouseEvent): void {
    event.preventDefault();
    this.location.back();
  }
}
