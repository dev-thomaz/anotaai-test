import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Item, typeMap } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  template: `
    <div class="item-card">
      <div class="item-card__image-container">
        <img class="item-card__image" [src]="item.img" alt="{{ item.title }}">
        <span class="item-card__tag item-card__tag--{{ getTypeClass() }}">{{ getTypeText() }}</span>
        <button class="item-card__delete-button" (click)="onDelete()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="item-card__content">
        <h3 class="item-card__title">{{ item.title }}</h3>
        <p class="item-card__description">{{ item.description }}</p>
      </div>
      <div class="item-card__add-button-container">
        <button class="item-card__add-to-cart"><i class="fas fa-plus"></i> Adicionar</button>
      </div>
    </div>
  `,
  styles: [`
    .item-card {
      width: 300px;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: left;
      margin-bottom: 16px;
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 430px; 
      overflow:visible;
    }

    .item-card__image-container {
      position: relative;
      margin-bottom: 8px;
      height: 200px;
      overflow: visible;
    }

    .item-card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-card__tag {
      position: absolute;
      bottom: 8px;
      right: 8px;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
    }

    .item-card__tag--paisagem {
      background-color: #1857FF;
    }

    .item-card__tag--flor {
      background-color: #FE004B;
    }

    .item-card__tag--pizza {
      background-color: #958903;
    }

    .item-card__content {
      padding: 0 12px;
      display: flex;
      min-height:200px;
      flex-direction: column; 
    }

    .item-card__title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .item-card__description {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 12px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
    }

    .item-card__add-button-container {
      padding: 12px;
      text-align: center;
    }

    .item-card__add-to-cart {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 14px;
    }

    .item-card__delete-button {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #fff;
      color: #666666;
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      line-height: 1;
      z-index: 10;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() delete = new EventEmitter<number>();
  typeMap = typeMap;

  getTypeText(): string {
    return this.typeMap[this.item.type] || 'Desconhecido';
  }

  getTypeClass(): string {
    const typeString = this.typeMap[this.item.type] || 'desconhecido';
    return typeString.toLowerCase();
  }

  onDelete(): void {
    this.delete.emit(this.item.id);
  }
}