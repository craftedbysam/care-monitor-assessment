import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ListStore, ListItem } from './list.store';

describe('ListStore', () => {
  let store: ListStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListStore,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    store = TestBed.inject(ListStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(store.items()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe(null);
  });

  it('should fetch items successfully', () => {
    const mockItems: ListItem[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' }
    ];

    store.fetchItems();

    expect(store.loading()).toBe(true);
    expect(store.error()).toBe(null);

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);

    req.flush(mockItems);

    expect(store.items()).toEqual(mockItems);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe(null);
  });

  it('should handle fetch error', () => {
    store.fetchItems();

    expect(store.loading()).toBe(true);

    const req = httpMock.expectOne('/api/items');
    req.flush({ message: 'Server error' }, { 
      status: 500, 
      statusText: 'Internal Server Error' 
    });

    expect(store.items()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Server error');
  });

  it('should reset error state when fetching new items', () => {
    store.error.set('Previous error');

    store.fetchItems();

    expect(store.error()).toBe(null);
    expect(store.loading()).toBe(true);

    const req = httpMock.expectOne('/api/items');
    req.flush([]);
  });

  it('should handle HTTP error response', () => {
    store.fetchItems();

    const req = httpMock.expectOne('/api/items');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeTruthy();
    expect(store.items()).toEqual([]);
  });

  it('should handle empty response', () => {
    store.fetchItems();

    const req = httpMock.expectOne('/api/items');
    req.flush([]);

    expect(store.items()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe(null);
  });
});