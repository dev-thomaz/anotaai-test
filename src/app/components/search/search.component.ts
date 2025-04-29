import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
    <input
      type="text"
      [(ngModel)]="searchTerm"
      (input)="onSearchInputChange()"
      class="search-input"
    >
    <button (click)="onSearchInputChange()" class="search-button">
        <i class="fas fa-search search-icon"></i>
    </button>
  </div>
  `,
  styles: [`
    .search-container {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 6px;
    border: 1px solid #ccc; 
    transition: border-color 0.2s ease-in-out;
  
    &:hover {
      border-color: #81d4fa; 
        
      
      .search-input {
        border-right-color: #81d4fa;
      }
      .search-button {
        border-left-color: #81d4fa;
      }
    }
  
    &:focus-within { 
      border-color: #29b6f6; 
        border-width: 3px;
      
      .search-input {
        border-right-color: #29b6f6;
        border-right-width: 3px;
      }
      .search-button {
        border-left-color: #29b6f6;
        border-left-width: 3px;
      }
    }
  }
  
  .search-input {
    flex-grow: 1;
    padding: 10px;
    border: none; 
    border-right: 1px solid #ccc; 
    border-radius: 4px 0 0 4px;
    font-size: 1em;
    height: 36px;
    outline: none; 
  }
  
  .search-button {
    background-color: #fff; 
    color: #777; 
    border: none; 
    padding: 8px; 
    width: 50px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 45px;
    height: 56px;
    font-weight: bold;
    display: flex; 
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease-in-out;
  
    &:hover {
      color: #0056b3; 
    }
  }
  
  .search-icon {
    font-size: 25px;
    fill: currentColor; 
  }
  `],
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearchInputChange(): void {
    this.search.emit(this.searchTerm);
  }
}