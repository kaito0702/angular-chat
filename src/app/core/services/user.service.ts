import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  create(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (credential) => {
        // const actionCodeSettings = {
        //   url: `http://localhost:4200/?newAccount=true&email=${credential.user.email}`,
        // };
        // sendEmailVerification(credential.user, actionCodeSettings);

        addDoc(collection(this.firestore, 'users'), {
          email: email,
          uid: credential.user.uid,
        });
      })
      .then(() => this.router.navigateByUrl('/users/new'));
  }

  async update(values: { displayName: string }): Promise<void> {
    const current_user = this.auth.currentUser;
    const q = query(
      collection(this.firestore, 'users'),
      where('uid', '==', current_user?.uid)
    );
    const usersSnapshots = await getDocs(q);
    const userSnapshot = usersSnapshots.docs[0];
    console.log(userSnapshot.id);
    if (current_user) {
      updateProfile(current_user, values).then(() =>
        updateDoc(doc(this.firestore, `users/${userSnapshot.id}`), values)
      );
    }
  }
}
