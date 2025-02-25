import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../core/services/posts/posts.service';
import { IPost } from '../../../core/interfaces/post/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../comments/comments/comments.component";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentsComponent , FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{
  private readonly _PostsService = inject(PostsService);
  constructor(private toastr: ToastrService){}
  postsData!:IPost[];
  postConent!:string // shayla el post nafso (ay 7aga btktb f el textArea)
  postImg!:File;
  @ViewChild('hamo') modal!:ElementRef
  ngOnInit(): void {
  this._PostsService.GetAllPosts().subscribe({
    next:(res)=>{
      console.log(res.posts);
      this.postsData = res.posts;
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }

  imgChanged(e:Event){
    let inputFile = (e.target)as HTMLInputElement
    if(inputFile.files && inputFile.files.length > 0){
      console.log(inputFile.files[0]);
      this.postImg = inputFile.files[0];
    }
  }

  CreatePost(){
    let formData = new FormData()
    formData.append('body' , this.postConent);
    formData.append('image' , this.postImg);
    console.log(formData);
    for( let [hamo,hambozo] of formData.entries() ){
      console.log(hamo , hambozo);
    }

    this._PostsService.CreatePost(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.show(res.message , 'Linked Posts' ,{toastClass:'my-toast' , positionClass:'my-toast-position' , progressBar:true , progressAnimation:'decreasing' , timeOut:1500})
      },
      error:(err)=>{
        this.toastr.show(err.message , 'Linked Posts' ,{toastClass:'my-toast-fail' , positionClass:'my-toast-position' , progressBar:true , progressAnimation:'decreasing' , timeOut:1500})

      }
    })


    // Return { 'body': 'new post' , 'image' : postImg }
  }


}
