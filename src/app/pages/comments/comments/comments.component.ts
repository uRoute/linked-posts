import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComment } from '../../../core/interfaces/comment/icomment';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-comments',
  imports: [DatePipe,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{

  private readonly _CommentsService = inject(CommentsService)
  postComments!:IComment[];
  comment!:string
  @Input() postId!:string
  ngOnInit(): void {
    this._CommentsService.GetPostComments(this.postId).subscribe({
      next:(res)=>{
        console.log(res.comments);
        this.postComments =  res.comments;
      }
    })
  }

  SendComment(post_id:string){
    this._CommentsService.CreateComment(post_id , this.comment).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == 'success'){
          this.postComments = res.comments
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  checkCommentImg(comment:IComment){
    console.log(comment.commentCreator.photo);
    
  }

}
