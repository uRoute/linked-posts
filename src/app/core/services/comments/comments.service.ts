import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environment/environement';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient:HttpClient) { }
  CreateComment(post_id:string , comment:string):Observable<any>{
    return this._HttpClient.post(`${environement.baseUrl}/comments` ,{
      "content":comment,
      "post":post_id
  })
  }
  GetPostComments(post_id:string):Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/posts/${post_id}/comments`)
  }
  UpdateComment(comment_id:string , comment:string):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/comments/${comment_id}`, {
      "content":comment
  })
  }
  DeleteComment(comment_id:string):Observable<any>{
    return this._HttpClient.delete(`${environement.baseUrl}/comments/${comment_id}`)
  }
}
