import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './BaseService';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * @author Madelief van Slooten
   * Calls backend to get array of all posts.
   * @returns observable array of posts
   */
  public async getPosts(): Promise<Observable<Post[]>> {
    const url = 'http://localhost:3000/posts/';
    return await this.http.get<Post[]>(url).pipe();
  }
}
