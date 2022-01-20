import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { User } from './user';

export class Comment {
  id: string;
  date: Date;
  message: string;
  user_id: string;

  constructor(id: string, date: Date, message: string, user_id: string) {
    this.id = id;
    this.date = date;
    this.message = message;
    this.user_id = user_id;
  }
}

export const commentConverter = {
  toFirestore(comment: Comment): DocumentData {
    return {
      date: comment.date,
      message: comment.message,
      user_id: comment.user_id,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Comment {
    const data: any = snapshot.data(options)!;
    return new Comment(
      snapshot.id,
      data.date.toDate(),
      data.message,
      data.user_id
    );
  },
};
