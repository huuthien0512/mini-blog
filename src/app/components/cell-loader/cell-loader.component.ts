import { ComponentType } from '@angular/cdk/portal';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseCellComponent } from '../base-cell/base-cell.component';

@Component({
  selector: 'app-cell-loader',
  templateUrl: './cell-loader.component.html',
  styleUrls: ['./cell-loader.component.scss'],
})
export class CellLoaderComponent<T extends BaseCellComponent> {
  @Input() component!: ComponentType<T>;
  @Input() data!: unknown;

  @ViewChild('cell', { static: true, read: ViewContainerRef })
  cell!: ViewContainerRef;

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    this.cell.clear();
    const componentRef = this.cell.createComponent(this.component);
    componentRef.instance.data = this.data;
  }
}
