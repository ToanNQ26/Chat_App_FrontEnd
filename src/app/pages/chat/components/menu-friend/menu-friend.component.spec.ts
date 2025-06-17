import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFriendComponent } from './menu-friend.component';

describe('MenuFriendComponent', () => {
  let component: MenuFriendComponent;
  let fixture: ComponentFixture<MenuFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
