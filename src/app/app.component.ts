import { CommentEndToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  where,
  query,
} from '@angular/fire/firestore';
import { map, Observable, switchMap, tap } from 'rxjs';

import { Comment, commentConverter } from './class/comment';
import { User, userConverter } from './class/user';

interface Item {
  hoge: string;
}

interface CommentWithUser extends Comment {
  user: User;
}

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boardBgColor = 'blue';
  comment = '';
  comments$: Observable<CommentWithUser[]>;

  constructor(private firestore: Firestore) {
    const comments = collection(firestore, 'comments').withConverter(
      commentConverter
    );

    this.comments$ = collectionData(comments).pipe(
      switchMap((comments) => {
        const users = collection(firestore, 'users').withConverter(
          userConverter
        );
        return collectionData(users).pipe(
          map((users) => {
            return comments.map((comment) => {
              const user = users.filter(
                (user) => comment.user_id === user.id
              )[0]; // `comment.user_id`を使って、whereでdocumentを取得できるよう改良してみて！
              return {
                ...comment,
                user,
              };
            });
          })
        );
      })
    );
  }

  addComment(comment: string): void {
    if (comment) {
      // firestoreにメッセージをを登録
    }
  }
}
