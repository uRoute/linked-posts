import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environment/environement';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }
  CreatePost(formData:object):Observable<any>{
    // FormData{body: content bta3 el post , image : sort el post}
    return this._HttpClient.post(`${environement.baseUrl}/posts` , formData)
  }
  GetAllPosts():Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/posts`)
  }
  GetUserPosts():Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/users/664bcf3e33da217c4af21f00/posts`)
  }
  GetSinglePost(post_id:string):Observable<any>{
    // ActivedRoute
    return this._HttpClient.get(`${environement.baseUrl}/posts/${post_id}`)
  }
  UpdatePost(post_id:string, formData:object):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/posts/${post_id}` , formData)
  }
  DeletePost(post_id:string):Observable<any>{
    return this._HttpClient.delete(`${environement.baseUrl}/posts/${post_id}`)
  }
}
