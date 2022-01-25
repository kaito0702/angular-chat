import { Component, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { User, userConverter } from 'src/app/class/user';

@Component({
  selector: 'ac-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private firestore: Firestore) {
    this.users$ = collectionData(
      collection(firestore, 'users').withConverter(userConverter)
    );
  }

  ngOnInit(): void {}
}
