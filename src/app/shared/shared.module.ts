import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDatePipe } from '../pipes/comment-date.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentDatePipe],
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, CommentDatePipe],
})
export class SharedModule {}
