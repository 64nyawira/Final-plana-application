import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventstblComponent } from './eventstbl.component';

describe('EventstblComponent', () => {
  let component: EventstblComponent;
  let fixture: ComponentFixture<EventstblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventstblComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
