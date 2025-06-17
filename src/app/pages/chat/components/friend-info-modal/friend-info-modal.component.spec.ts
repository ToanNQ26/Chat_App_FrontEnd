import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInfoModalComponent } from './friend-info-modal.component';

describe('FriendInfoModalComponent', () => {
  let component: FriendInfoModalComponent;
  let fixture: ComponentFixture<FriendInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
