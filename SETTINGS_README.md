# Trang Cài đặt - Chat App

## Tổng quan
Trang cài đặt được thiết kế để người dùng có thể quản lý thông tin cá nhân, cài đặt bảo mật và tùy chỉnh trải nghiệm sử dụng ứng dụng chat.

## Các tính năng chính

### 1. Thông tin cá nhân
- **Thay đổi ảnh đại diện**: Click vào ảnh hoặc nút "Thay đổi ảnh"
- **Cập nhật tên hiển thị**: Chỉnh sửa tên hiển thị trong chat
- **Xem email**: Hiển thị email tài khoản (chỉ đọc)
- **Thêm giới thiệu**: Viết mô tả về bản thân
- **Lưu thông tin**: Lưu các thay đổi vào localStorage

### 2. Bảo mật & Quyền riêng tư 
- **Hiển thị trạng thái online**: Bật/tắt việc hiển thị trạng thái online cho người khác
- **Thông báo tin nhắn mới**: Bật/tắt thông báo khi có tin nhắn mới
- **Thông báo cuộc gọi**: Bật/tắt thông báo cuộc gọi đến
- **Chế độ tối**: Chuyển đổi giữa giao diện sáng và tối

### 3. Cài đặt chat
- **Hiển thị thời gian gửi**: Bật/tắt hiển thị thời gian gửi tin nhắn
- **Đọc tin nhắn**: Bật/tắt hiển thị trạng thái đã đọc tin nhắn
- **Âm thanh tin nhắn**: Bật/tắt âm thanh khi có tin nhắn mới

### 4. Quản lý tài khoản
- **Đổi mật khẩu**: Mở modal để thay đổi mật khẩu
- **Xuất dữ liệu**: Xuất dữ liệu cá nhân (tính năng đang phát triển)
- **Xóa tài khoản**: Xóa vĩnh viễn tài khoản (tính năng đang phát triển)
- **Đăng xuất**: Đăng xuất khỏi ứng dụng

## Cấu trúc file

```
src/app/pages/chat/components/setting/
├── setting.component.html    # Template HTML
├── setting.component.ts      # Logic TypeScript
├── setting.component.css     # Styles CSS
└── setting.component.spec.ts # Unit tests
```

## Cách sử dụng

### 1. Import component
```typescript
import { SettingComponent } from './components/setting/setting.component';
```

### 2. Thêm vào routing
```typescript
{ path: 'settings', component: SettingComponent }
```

### 3. Sử dụng trong template
```html
<app-setting></app-setting>
```

## Lưu trữ dữ liệu

### localStorage Keys
- `user`: Thông tin người dùng
- `userSettings`: Cài đặt ứng dụng
- `token`: Token xác thực

### Cấu trúc dữ liệu
```typescript
interface User {
  id: string;
  displayName: string;
  email: string;
  bio: string;
  avatar?: string;
}

interface Settings {
  showOnlineStatus: boolean;
  messageNotifications: boolean;
  callNotifications: boolean;
  darkMode: boolean;
  showMessageTime: boolean;
  showReadReceipts: boolean;
  messageSound: boolean;
}
```

## Responsive Design

Trang setting được thiết kế responsive với các breakpoint:
- **Desktop**: Hiển thị đầy đủ layout
- **Tablet (768px)**: Điều chỉnh layout cho màn hình vừa
- **Mobile (480px)**: Layout tối ưu cho điện thoại

## Dark Mode

Chế độ tối được hỗ trợ với:
- Tự động áp dụng khi bật setting
- Lưu trạng thái vào localStorage
- Styles riêng cho dark mode

## Tương lai

### Tính năng đang phát triển
- [ ] Upload ảnh đại diện
- [ ] Xuất dữ liệu cá nhân
- [ ] Xóa tài khoản
- [ ] Đồng bộ settings với backend
- [ ] Thêm các tùy chọn cài đặt khác

### Cải tiến
- [ ] Thêm animations
- [ ] Toast notifications
- [ ] Loading states
- [ ] Error handling
- [ ] Unit tests

## Dependencies

- Angular 17+
- Font Awesome 6.4.0 (CDN)
- CommonModule
- FormsModule
- Router

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+ 