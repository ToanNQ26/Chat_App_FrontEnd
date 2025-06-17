import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Message } from '../../../../models/message';
import { User } from '../../../../models/user';
import { Conversation } from '../../../../models/conversation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { ConversationHeaderComponent } from './conversation-header/conversation-header.component';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  imports: [FormsModule, CommonModule, MessageItemComponent, MessageInputComponent, ConversationHeaderComponent],
})
export class ChatWindowComponent implements AfterViewInit, OnChanges {
  @Input() messages: Message[] = [];
  @Input() user!: User;
  @Input() selectedConversation!: Conversation ;
  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      this.scrollToBottom();
    }
  }

  onSend(message: string) {
    this.sendMessage.emit(message);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
        console.log("ngu", this.scrollContainer)
      }
    }, 0);
  }
}
