import { ComponentType } from '@angular/cdk/portal';

export interface TableColumn {
  name: string;
  field: string;
  hidden: boolean;
  cellComponent: ComponentType<any>;
  params?: unknown;
  actions?: unknown;
}
