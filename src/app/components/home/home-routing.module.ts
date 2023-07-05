import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PermissionGuard } from 'src/app/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'blog',
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('../blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'my-blog',
        loadChildren: () =>
          import('../my-blogs/my-blogs.module').then((m) => m.MyBlogsModule),
      },
      {
        path: 'publish',
        loadChildren: () =>
          import('../publish/publish.module').then((m) => m.PublishModule),
      },
      {
        path: 'detail/:id',
        loadChildren: () =>
          import('../detail/detail.module').then((m) => m.DetailModule),
      },

      {
        path: 'edit/:id',
        loadChildren: () =>
          import('../publish/publish.module').then((m) => m.PublishModule),
      },
      {
        path: '',
        children: [
          {
            path: 'user',
            canLoad: [PermissionGuard],
            loadChildren: () =>
              import('../user-management/user-management.module').then(
                (m) => m.UserManagementModule
              ),
          },
        ],
      },
      {
        path: 'category',
        loadChildren: () =>
          import('../category-management/category-management.module').then(
            (m) => m.CategoryManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
