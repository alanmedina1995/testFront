import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Post } from '../models/postInterface';
import { map } from 'rxjs/operators';
import { Comment } from '../models/commentInterface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  comments: Comment[] = [];

  constructor(private http: HttpClient) { }

  
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.pathUrl)
      .pipe(map((x) => x.slice(0, 10)));
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(environment.pathUrl + `/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.pathUrl + `post/${id}/comments`).pipe(map((res:any)=>{return res}));
  }

  addComment(comment: Comment) {
    this.comments.push(comment)
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  loadStorage() {
    if (localStorage.getItem('comments')) {
      this.comments = JSON.parse(localStorage.getItem('comments')!)
    }
    return this.comments
  }

  deleteComment(id: number):void{
    const deleteComment = this.comments.filter( comment => comment.id !== id);
    this.comments = deleteComment;
    this.saveListStorage();
  }

  saveListStorage():void{
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  getListStorage():void{
    this.loadStorage();
    if (localStorage.getItem('comments')){
      this.comments = JSON.parse(localStorage.getItem('comments')!);
    } else {
      this.comments = []
    }
  }

  getListCommentsByPost(postId?: number):Comment[]{
    this.getListStorage();
    if(postId){
      return this.comments.filter( comment => comment['postId'] === postId);
    } else {
      return this.comments;
    }
  }


}
