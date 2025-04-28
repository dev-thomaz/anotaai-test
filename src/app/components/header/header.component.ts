import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <div class="header">
    <img src="https://githubanotaai.github.io/frontend-interview-mock-data/assets/128x128.png" alt="">
      <div class="header__text-area">
        <div class="header__page-title">Teste de Desenvolvedor Front-End - Anota Aí</div>
        <div class="header__user-info">Thomaz Bittencourt</div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;

      img{
        width:50px;
      }
    }

    .header__text-area {
      display: flex;
      align-items:center;
      flex-direction:column;
    }

    .header__page-title {
      font-size: 18px;
      margin-right: 20px;
    }

    .header__user-info {
      margin-right: 20px;
      color: #6c757d;
      font-size: 14px;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}