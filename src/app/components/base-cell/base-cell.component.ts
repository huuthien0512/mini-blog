import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-cell',
  templateUrl: './base-cell.component.html',
  styleUrls: ['./base-cell.component.scss'],
})
export class BaseCellComponent {
  @Input() data: unknown;
  @Output() action: unknown;
}
