import { FirebaseApp } from '@angular/fire/app';
import { UserInfo } from '@angular/fire/auth';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

export class User {
  displayName: string;
  email: string;
  uid: string;
  initial?: string;

  constructor(displayName: string, email: string, uid: string) {
    this.displayName = displayName!;
    this.email = email!;
    this.uid = uid!;
    this.initial = displayName?.slice(0, 1)!;
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      initial: user.initial,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data: any = snapshot.data(options)!;
    return new User(data.displayName, data.email, data.uid);
  },
};
