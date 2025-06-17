import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { FriendShip } from '../models/friend-ship';
import { FriendRequest } from '../models/friend-request';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

 private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getFriendListAPI(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/friend/${id}`)
  }

  sendFriendRequest(senderId: string, receiverId: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/friend-requests`, {senderId, receiverId})
  }

  getFriendRequest(userId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/friend-requests/invitations/${userId}`)
  }

  deleteFriendShip(userId: string, friendId: string): Observable<any> {
    return this.http.request('DELETE', `${this.apiUrl}/friend`, {
      body: { userId, friendId }
    });
  }

  acceptFriendRequest(friendRequestId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/friend-requests/${friendRequestId}/accept`, {});
  }

  refuseFriendRequest(senderId: string, receiverId: string):  Observable<any>{
    return this.http.request('DELETE',`${this.apiUrl}/friend-requests/cancel`,{body: {senderId, receiverId}})
  }

  saveFriend = localStorage.getItem('listFriend');
    private listFriend = new BehaviorSubject<FriendShip[] | null>(
      this.saveFriend ? JSON.parse(this.saveFriend): []
    );
    listFriend$ = this.listFriend.asObservable();
  
    setFriend(friend: FriendShip) {
      const currentList = this.listFriend.getValue() || [];
    
      // Kiểm tra nếu chưa có conversation.id thì mới thêm
      const alreadyExists = currentList.some(friends => friends.id === friend.id);
      if (!alreadyExists) {
        const updateList = [...currentList, friend];
        localStorage.setItem('listFriend', JSON.stringify(updateList));
        this.listFriend.next(updateList);
      }
    } 
  
    getFriend() : FriendShip[]{
      const listConversation = this.listFriend.getValue() || [];
      return listConversation;
    }
  
    clearFriend() {
      localStorage.removeItem('listFriend');
      this.listFriend.next([]);
    }
}
