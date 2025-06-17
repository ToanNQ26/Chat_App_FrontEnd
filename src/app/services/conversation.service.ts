import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Conversation } from '../models/conversation';
import { ConversationParticipant } from '../models/conversation-participant';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private apiUrl = environment.apiUrl+'/conversation';

  constructor(private http: HttpClient) { }

  getConversationApi(id: string): Observable<any> {
    //const params = new HttpParams().set('userId', id);

    return this.http.get<any>(`${this.apiUrl}/${id}/notMessage`);
  }

  getGroupConversationApi(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}/option`)
  }

  addConversationApi(conversationId: string, name: string,memberId: string[] ): Observable<any>{
    return this.http.post(`${this.apiUrl}`, {conversationId, name, memberId})
  }

  addMemberConversationApi (conversationId: string, userId: string[]): Observable<any>{
    return this.http.post(`${this.apiUrl}/listmembers`, {conversationId, userId})
  }

  getMembers(conversationId: string): Observable<{ result: User[] }> {
    return this.http.get<{ result: User[] }>(
      `${this.apiUrl}/members/${conversationId}`
    );
  }

  leaveGroup(conversationId: string, userId: string): Observable<any>{
    return this.http.request('DELETE', `${this.apiUrl}/members/leave`, {body: {conversationId, userId}})
  }

  deleteMember(conversationId: string, userId: string): Observable<any>{
    return this.http.request('DELETE', `${this.apiUrl}/members`, {body: {conversationId, userId}})
  }

  deleteGroup(id: string): Observable<any>{
    return this.http.request('DELETE', `${this.apiUrl}/${id}`)
  }

  getUserConversation(userId: string[]): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/option2`, {userId})
  }

  saveConversation = localStorage.getItem('listConversation');
  private listConversation = new BehaviorSubject<Conversation[] | null>(
    this.saveConversation ? JSON.parse(this.saveConversation): []
  );
  listConversation$ = this.listConversation.asObservable();

  setConversation(conversation: Conversation){
    const currentList = this.listConversation.getValue() || [];
    const updateList = [...currentList, conversation];
    localStorage.setItem('listConversation' ,JSON.stringify(updateList));
    this.listConversation.next(updateList);
  }

  getConversation() : Conversation[]{
    const listConversation = this.listConversation.getValue() || [];
    return listConversation;
  }

  clearConversations() {
    localStorage.removeItem('listConversation');
    this.listConversation.next([]);
  }
}
