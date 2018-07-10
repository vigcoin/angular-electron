import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumComponent, NavbarComponent],
      imports: [
      TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
