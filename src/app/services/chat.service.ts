import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = environment.apiUrl+'/conversation';
  constructor( private http: HttpClient) { }

  getMessages(conversationId: string): Observable<any>{
    //const params = new HttpParams().set('id/messages', conversationId);
    return this.http.get<any>(`${this.apiUrl}/${conversationId}/messages`);
  }
}
