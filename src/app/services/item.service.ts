import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = 'https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
}