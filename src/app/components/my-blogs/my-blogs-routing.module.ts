import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBlogsComponent } from './my-blogs.component';

const routes: Routes = [
  {
    path: '',
    component: MyBlogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBlogsRoutingModule {}
