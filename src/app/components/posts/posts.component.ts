import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/postInterface';
import { PostsService } from '../../services/posts.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  page_size: number = 10;
  page_number: number = 1;

  constructor(private postsService : PostsService) { }
  
  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data)=> 
    this.posts = data)
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }


}
