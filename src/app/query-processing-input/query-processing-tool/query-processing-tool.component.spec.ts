import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryProcessingToolComponent } from './query-processing-tool.component';

describe('QueryProcessingToolComponent', () => {
  let component: QueryProcessingToolComponent;
  let fixture: ComponentFixture<QueryProcessingToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryProcessingToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryProcessingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
