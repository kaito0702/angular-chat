import { CommentEndToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  where,
  query,
  setDoc,
  addDoc,
  orderBy,
} from '@angular/fire/firestore';
import { map, Observable, switchMap, tap } from 'rxjs';

import { Comment, commentConverter } from './class/comment';
import { User, userConverter } from './class/user';

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

  constructor(
    private firestore: Firestore,
    private angularFiresotore: AngularFirestore
  ) {
    const comments = query(
      collection(firestore, 'comments'),
      orderBy('date', 'asc')
    ).withConverter(commentConverter);

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

  async addComment(comment: string): Promise<void> {
    if (comment) {
      const docRef = await addDoc(collection(this.firestore, 'comments'), {
        date: new Date(),
        state: true,
        message: comment,
        user_id: 'user1',
      });

      console.log('Document written with ID: ', docRef.id);
    }
  }

  editComment(comment: CommentWithUser) {
    if (comment) {
      const commentDoc = this.angularFiresotore.doc<Comment>(
        'user/' + comment.user.id
      );
      commentDoc.valueChanges({ message: comment.message });
    }
  }
}
