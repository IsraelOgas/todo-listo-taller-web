import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasMapaComponent } from './tareas-mapa.component';

describe('TareasMapaComponent', () => {
  let component: TareasMapaComponent;
  let fixture: ComponentFixture<TareasMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
