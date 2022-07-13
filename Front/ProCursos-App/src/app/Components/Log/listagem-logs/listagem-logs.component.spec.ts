import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemLogsComponent } from './listagem-logs.component';

describe('ListagemLogsComponent', () => {
  let component: ListagemLogsComponent;
  let fixture: ComponentFixture<ListagemLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
