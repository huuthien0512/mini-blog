import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteItem } from 'src/app/models/route-item';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userMenu: RouteItem[] = [];
  sidenavMenu: RouteItem[] = [];
  currentUserName: string = '';
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const user: User = this.storageService.getLoggedInUser();
    this.currentUserName = user.username;
    this.isAdmin = user.roleName === 'ADMIN';
    this.onSettingRoute(this.isAdmin);
  }

  onSettingRoute(isAdmin: boolean) {
    this.userMenu = [
      {
        name: 'Personal data',
        link: '/personal-data',
        child: [],
        isShow: true,
      },
      { name: 'Logout', link: '/logout', child: [], isShow: true },
    ];

    this.sidenavMenu = [
      {
        name: 'Blogs',
        icon: 'text_snippet',
        link: '/blog',
        child: [],
        isShow: true,
      },
      {
        name: 'My Blogs',
        icon: 'home',
        link: '#',
        child: [
          {
            name: 'List',
            icon: 'view_list',
            link: '/my-blog',
            child: [],
            isShow: true,
          },
          {
            name: 'Publish',
            icon: 'publish',
            link: '/publish',
            child: [],
            isShow: true,
          },
        ],
        isShow: true,
      },
      {
        name: 'User',
        icon: 'person',
        link: '/user',
        child: [],
        isShow: isAdmin,
      },
      {
        name: 'Category',
        icon: 'category',
        link: '/category',
        child: [],
        isShow: true,
      },
    ];
  }

  onSelectItem(item: RouteItem) {
    if (item.name === 'Logout') {
      this.onLogout();
    }
  }

  onLogout(): void {
    const title = 'Confirmation';
    const content = 'Do you want to logout ?';
    const okButtonLabel = 'Ok';
    const cancelButtonLabel = 'Cancel';
    const dialogRef = this.dialogService.openWarningDialog(
      title,
      content,
      okButtonLabel,
      cancelButtonLabel
    );
    const dialogSub = dialogRef.componentInstance.confirmAction.subscribe(
      () => {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.currentUserName = '';
      }
    );
    dialogRef.afterClosed().subscribe(() => dialogSub.unsubscribe());
  }
}
