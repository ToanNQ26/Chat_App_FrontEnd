import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private stompClient!: Client;
  private messageSubject = new Subject<any>();
  private isConnected = false;
  private pendingSubscriptions: (() => void)[] = [];
  private subscriptions: Map<string, StompSubscription> = new Map();

  constructor(private userService: UserService) {
    this.initStompClient();
  }

  private initStompClient() {
    this.stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(environment.apiUrl+'/chat-websocket'),
      connectHeaders: {
        userId: this.userService.getUser()?.userId || ''
      },
      reconnectDelay: 5000,
      debug: str => console.log(str),
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');
      this.isConnected = true;

      this.pendingSubscriptions.forEach(callback => callback());
      this.pendingSubscriptions = [];
    };

    this.stompClient.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  private ensureConnected() {
    if (!this.stompClient || !this.stompClient.active) {
      this.initStompClient();
    }
  }

  subscribeToConversation(conversationId: string): void {
    this.ensureConnected();

    const doSubscribe = () => {
      const sub = this.stompClient.subscribe(`/topic/messages/${conversationId}`, (message: IMessage) => {
        const body = JSON.parse(message.body);
        this.messageSubject.next(body);
      });

      // Lưu subscription để có thể unsubscribe sau
      this.subscriptions.set(conversationId, sub);
    };

    if (this.isConnected) {
      doSubscribe();
    } else {
      this.pendingSubscriptions.push(doSubscribe);
    }
  }

  unsubscribeFromConversation(conversationId: string): void {
    const sub = this.subscriptions.get(conversationId);
    if (sub) {
      sub.unsubscribe();
      this.subscriptions.delete(conversationId);
      console.log(`Unsubscribed from conversation ${conversationId}`);
    }
  }

  unsubscribeAll(): void {
    for (const [id, sub] of this.subscriptions.entries()) {
      sub.unsubscribe();
      console.log(`Unsubscribed from conversation ${id}`);
    }
    this.subscriptions.clear();
  }  

  sendMessage(message: Message) {
    this.ensureConnected();

    if (!this.isConnected) return;

    this.stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(message),
    });
  }

  onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      this.isConnected = false;
      this.subscriptions.clear();
      console.log("Disconnected from WebSocket");
    }
  }
}
