import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MessageInputComponent {
  messageContent = '';
  showEmojiPicker = false;
  emojis = [
    // Biểu cảm mặt người
    '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇',
    '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚',
    '😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩',
    '🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣',
    '😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬',

    // Tay và cử chỉ
    '👍','👎','👊','✊','🤛','🤜','👏','🙌','👐','🤝',
    '🙏','✍️','💅','🤳','💪','🖕','✌️','🤘','👌','👈',
    '👉','👆','👇','🖖','🫶','🫰','🤲','🤟','🫵','🫱',

    // Trái tim và cảm xúc
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💖',
    '💘','💝','💗','💓','💞','💕','💟','❣️','💔',

    // Động vật & tự nhiên
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
    '🦁','🐮','🐷','🐸','🐵','🦄','🐔','🐧','🐦','🐤',

    // Đồ ăn
    '🍎','🍌','🍉','🍇','🍓','🍒','🍍','🥭','🥝','🍑',
    '🍔','🍟','🍕','🌭','🥪','🍿','🧀','🍗','🥩','🍣',

    // Vật thể và biểu tượng
    '💡','📱','💻','🖥️','⌨️','🖱️','🎧','🎮','📷','📦',
    '💣','💥','💤','🛑','🚫','✅','❌','⚠️','⭐','🌟',
    '🔥','💨','🌈','☀️','🌙','⛄','🌊','💧','🕒','📅'
  ];
  @Output() send = new EventEmitter<string>();

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.messageContent += emoji;
    this.showEmojiPicker = false;
  }

  sendMessage() {
    const content = this.messageContent.trim();
    if (content) {
      this.send.emit(content);
      this.messageContent = '';
    }
  }
}
