import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ItemListComponent, FormsModule], 
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="search-container">
        <input type="text" placeholder="Pesquisar..." [(ngModel)]="searchTerm" (input)="onSearch()">
        <button><i class="fas fa-search"></i></button>
      </div>
      <app-item-list #itemList [searchTerm]="searchTerm"></app-item-list>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .search-container {
      padding: 16px;
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .search-container input[type="text"] {
      flex-grow: 1;
      max-width: 500px;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 4px 0 0 4px;
    }

    .search-container button {
      background-color:#fff;
      color: #666666;
      border: 1px solid #ced4da;
      border-radius: 0 4px 4px 0;
      padding: 10px 12px;
      cursor: pointer;
      font-size: 16px;
    }

    .search-container button i {
    }
  `],
})
export class AppComponent {
  title = 'anota-ai-app'; 
  searchTerm: string = '';

  onSearch(): void {
    
  }
}