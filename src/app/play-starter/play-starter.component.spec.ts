import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStarterComponent } from './play-starter.component';

describe('PlayStarterComponent', () => {
  let component: PlayStarterComponent;
  let fixture: ComponentFixture<PlayStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayStarterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
