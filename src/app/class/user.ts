import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

export class User {
  id: string;
  name: string;
  initial: string;
  status: boolean;

  constructor(id: string, name: string, initial: string, status: boolean) {
    this.id = id;
    this.name = name;
    this.initial = initial;
    this.status = status;
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { name: user.name, initial: user.initial, status: user.status };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data: any = snapshot.data(options)!;
    return new User(snapshot.id, data.name, data.initial, data.status);
  },
};
