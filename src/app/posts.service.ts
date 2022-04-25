import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Post } from './models/postInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http: HttpClient) { }

  
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.pathUrl)
      .pipe(map((x) => x.slice(0, 10)));
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(environment.pathUrl + `/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.pathUrl + `/${id}/comments`);
  }


}
