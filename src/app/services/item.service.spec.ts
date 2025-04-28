import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ItemService,
      ],
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve items from the API via GET', () => {
    const mockItems = [{ id: 1, title: 'Item 1', img:'https://githubanotaai.github.io/frontend-interview-mock-data/assets/img-test-01.jpg', type:1, description: 'description' }];

    service.getItems().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items).toEqual(mockItems);
    });

    const request = httpMock.expectOne('https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json');
    expect(request.request.method).toBe('GET');
    request.flush(mockItems);
  });
});