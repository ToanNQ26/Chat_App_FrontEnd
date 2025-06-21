import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SidebarComponent } from './pages/chat/components/sidebar/sidebar.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { FriendListComponent } from './pages/chat/friend/friend-list/friend-list.component';
import { ConversationListComponent } from './pages/chat/conversation/conversation-list/conversation-list.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MenuFriendComponent } from './pages/chat/components/menu-friend/menu-friend.component';
import { OnlineUsersComponent } from './pages/chat/components/online-user/online-user.component';
import { SettingComponent } from './pages/chat/components/setting/setting.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // <-- thêm nếu muốn mặc định load login 

  {
    path: 'register',
    loadComponent: ()=> import('./pages/register/register.component').then(m => m.RegisterComponent),
  },

  {
    path: 'forgot-password',
    loadComponent: ()=> import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },

  // {
  //   path: 'chat',
  //   loadComponent: ()=> import('./pages/chat/chat/chat.component').then(m => m.ChatComponent),
  //   canActivate: [AuthGuard]
  // },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
      path: 'chat/:conversationId',
      component: ChatComponent,
      canActivate: [AuthGuard]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard]
      },
      { path: 'friends', component: MenuFriendComponent },
      { path: 'conversation', component: ConversationListComponent },
      { path: 'online-users', component: OnlineUsersComponent },
      { path: 'settings', component: SettingComponent },
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
    ],
  },

];
