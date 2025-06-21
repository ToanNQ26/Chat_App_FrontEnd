import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="buttonClass" [type]="type" [disabled]="loading || disabled">
      <span *ngIf="!loading">{{ text }}</span>
      <span *ngIf="loading">
        <span class="spinner"></span> {{ loadingText }}
      </span>
    </button>
  `,
  styles: [`
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingButtonComponent {
  @Input() loading = false;
  @Input() text = 'Submit';
  @Input() loadingText = 'Đang xử lý...';
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() disabled = false;
  @Input() buttonClass = '';

}
