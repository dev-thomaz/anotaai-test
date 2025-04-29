import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadItems, deleteItem } from '../../store/actions/item.actions';
import { selectItems, selectLoading, selectError } from '../../store/selectors/item.selectors';
import { AppState } from '../../store/state';
import { map, startWith } from 'rxjs/operators';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemCardComponent, AsyncPipe, NgFor, NgIf, SearchComponent],
  template: `
<div>
    <app-search (search)="handleSearch($event)"></app-search>
</div>
<div class="item-list">
    <div *ngIf="loading$ | async" class="loading-message">Carregando itens...</div>
    <div *ngIf="error$ | async" class="error-message">Erro ao carregar os itens: {{ error$ | async }}</div>
  
    <div *ngIf="!(loading$ | async) && !(error$ | async) && (filteredItems$ | async)?.length === 0" class="no-items-found">
        <i class="fas fa-frown sad-icon"></i>
      <p>Nenhum item encontrado.</p>
    </div>
  
    
      <app-item-card *ngFor="let item of filteredItems$ | async" [item]="item"></app-item-card>
    
</div>
  `,
  styles: [`
   .item-list {
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    justify-content: space-around;
  }
  .no-items-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    color: #777;
  }
  
  .sad-icon {
    margin-bottom: 10px;
    font-size: 150px;
    color: orangered;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit, OnChanges {
  private store = inject(Store<AppState>);
  items$: Observable<Item[]> = this.store.select(selectItems);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  @Input() searchTerm: string = '';
  filteredItems$!: Observable<Item[]>;

  ngOnInit(): void {
    this.store.dispatch(loadItems());
    this.handleSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.handleSearch();
    }
  }

  deleteCard(id: number): void {
    this.store.dispatch(deleteItem({ id }));
  }

  handleSearch(searchTerm: string = ''): void {
    this.filteredItems$ = this.items$.pipe(
      startWith([]),
      map(items =>
        items.filter(item =>
          item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
          item.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
      )
    );
  }
}