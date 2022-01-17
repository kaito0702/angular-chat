import { CommentEndToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '田中太郎')
const ANOTHER_USER: User = new User(2, '佐藤太郎')

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お久しぶりです'),
  new Comment(ANOTHER_USER, 'お元気ですか？'),
  new Comment(CURRENT_USER, 'お久しぶりです！'),
  new Comment(CURRENT_USER, '元気です！！')
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  boardBgColor = 'blue'
  comment = '';

  addComment(comment: string): void {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }

  bgColor(comment: Comment) {
    const backgroundColor = comment.user.uid === this.currentUser.uid ? '#6ee771' : 'white';
    return backgroundColor
  }

}
