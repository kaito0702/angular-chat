import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  addDoc,
  orderBy,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';

import { Comment, commentConverter } from '../class/comment';
import { User, userConverter } from '../class/user';

interface CommentWithUser extends Comment {
  user: User;
}

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  boardBgColor = 'blue';
  comment = '';
  changed_comment = '';
  comments$: Observable<CommentWithUser[]>;

  constructor(private firestore: Firestore) {
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

  ngOnInit(): void {}

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

  async editComment(comment: CommentWithUser) {
    console.log('hoge ' + this.changed_comment);
    if (comment) {
      return await updateDoc(doc(this.firestore, `comments/${comment.id}`), {
        message: this.changed_comment,
      });
    }
  }

  deleteComment(comment: CommentWithUser) {
    if (comment) {
      deleteDoc(doc(this.firestore, `comments/${comment.id}`));
    }
  }
}