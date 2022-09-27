import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseComponent } from './muse.component';

describe('MuseComponent', () => {
  let component: MuseComponent;
  let fixture: ComponentFixture<MuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
