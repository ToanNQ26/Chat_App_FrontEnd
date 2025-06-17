import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+'/User';

  constructor(private http: HttpClient) { }

  getUserApi(phone: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/getUser/${phone}`);
  }

  getUserList(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserById/${id}`)
  }

  saveUser = localStorage.getItem('currentUser');
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.saveUser ? JSON.parse(this.saveUser): null
  );
  currentSubject$ = this.currentUserSubject.asObservable();

  setUser(user: User){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUser(){
    return this.currentUserSubject.getValue();
  }

  //user friend
  saveFriendUser = localStorage.getItem('listFriendUser');
    private listFriendUser = new BehaviorSubject<User[] | null>(
      this.saveFriendUser ? JSON.parse(this.saveFriendUser): []
    );
    listFriendUser$ = this.listFriendUser.asObservable();
  
    setFriendUser(friendUser: User) {
      const currentList = this.listFriendUser.getValue() || [];
    
      // Kiểm tra nếu chưa có conversation.id thì mới thêm
      const alreadyExists = currentList.some(friendUsers => friendUsers.userId === friendUser.userId);
      if (!alreadyExists) {
        const updateList = [...currentList, friendUser];
        localStorage.setItem('listFriendUser', JSON.stringify(updateList));
        this.listFriendUser.next(updateList);
      }
    }  
  
    getFriendUser() : User[]{
      const listFriendUser = this.listFriendUser.getValue() || [];
      return listFriendUser;
    }
  
    clearFriendUser() {
      localStorage.removeItem('listFriendUser');
      this.listFriendUser.next([]);
    }

}
