import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Comment } from '../../models/commentInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() postId!: number;
  @Output() commentDate:  EventEmitter<Date>;
  dateOfComment: Date;
  comments: Comment[] = [];
  form!: FormGroup;
  page_size: number = 10;
  page_number: number = 1;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private postService: PostsService, private formBuilder: FormBuilder) {
    this.commentDate = new EventEmitter();
    this.dateOfComment = new Date();
    this.buildFrom();
  }

  ngOnInit(): void {
    this.postService.getComments(this.postId!)
      .subscribe((data: Comment[]) => {
        this.comments = data;
        if (this.postService.getListCommentsByPost(this.postId)) {
          this.comments = [...this.comments, ...this.postService.getListCommentsByPost(this.postId)];
        }
      })

  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  setCommentDate(){
    this.dateOfComment = new Date();
    this.commentDate.emit(this.dateOfComment);
  }

  deleteComment(id: number){
    const deleteComment = this.comments.filter( comment => comment.id !== id);
    this.comments = deleteComment;
    this.postService.deleteComment(id);
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  isInvalid(control: string) {
    return (
      this.form.controls[control].errors && this.form.controls[control].touched
    );
  }
  isValid(control: string) {
    return (
      !this.form.controls[control].errors && this.form.controls[control].touched
    );
  }

  isCommentInStorage(id?: number){
    return(this.postService.getListCommentsByPost(this.postId).find(comment => comment['id']=== comment.id));
  }

  saveComment() {
    this.form.markAllAsTouched();
    const comment = this.form.value as Comment;
    comment.postId = this.postId;
    comment.id = this.comments.length;
    comment.date = new Date();
    this.postService.addComment(comment);
    this.form.reset();
    this.ngOnInit();
    
  }



}
