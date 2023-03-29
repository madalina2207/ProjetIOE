import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scene3DComponent } from './scene3-d.component';

describe('Scene3DComponent', () => {
  let component: Scene3DComponent;
  let fixture: ComponentFixture<Scene3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scene3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scene3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
