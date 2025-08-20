import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List } from './list';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListStore } from '../services/list.store';
import { signal } from '@angular/core';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let httpClient: HttpClient;
  let authService: AuthService;
  let router: Router;
  let listStore: ListStore;

  const httpClientMock = {
    get() {}
  }

  const authServiceMock = {
    logout() {}
  }

  const routerMock = {
    navigate() {}
  }

  const listStoreMock = {
    fetchItems: jasmine.createSpy('fetchItems'),
    loading: signal(false),
    items: signal([]),
    error: signal(null)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: HttpClient, useValue: httpClientMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ListStore, useValue: listStoreMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    listStore = TestBed.inject(ListStore);
    fixture.detectChanges();
  });

  it('should create list component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch items on component initialization', () => {
    expect(listStore.fetchItems).toHaveBeenCalled();
  });

  it('should call logout and navigate to login page', () => {
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');
    component.logout();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display loading state', () => {
    listStore.loading.set(true);
    fixture.detectChanges();
    
    expect(listStore.loading()).toBe(true);
  });

  it('should display items when loaded', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', description: 'Description 1' }
    ];
    listStore.items.set(mockItems);
    fixture.detectChanges();
    
    expect(listStore.items()).toEqual(mockItems);
  });
});
