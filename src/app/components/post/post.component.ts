import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/postInterface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post!: Post;
  currentId!: number;
  dateLastComment!: Date;
  

  constructor(private activatedRoute: ActivatedRoute, private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = params['id'];
      this.postsService.getPostById(params['id']).subscribe(
        (post) => (this.post = post),
        () => {
          this.router.navigate(['/404/' + this.currentId]);
        }
      );
    });
  }

  setDateComment(date: Date){
    this.dateLastComment = date;
  }

}
