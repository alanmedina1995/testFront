import { Component, OnInit } from '@angular/core';
import { Post } from '../models/postInterface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService : PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data)=> 
    this.posts = data)
  }

}
