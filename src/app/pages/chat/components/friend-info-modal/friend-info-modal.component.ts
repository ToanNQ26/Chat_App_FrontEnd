import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-info-modal',
  imports: [CommonModule],
  templateUrl: './friend-info-modal.component.html',
  styleUrl: './friend-info-modal.component.css'
})
export class FriendInfoModalComponent {
  @Input() friend!: User | null;
  @Input() fullscreen: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
