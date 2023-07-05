import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AdminUserService } from 'src/app/services/admin/admin-user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  @ViewChild('tableHeader') tableHeader!: ElementRef;
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  isLoading: boolean = false;

  keywords: string = '';
  users: User[] = [];
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  isEditingRole: boolean = false;

  constructor(
    private renderer: Renderer2,
    private adminUserService: AdminUserService,
    private roleService: RoleService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadUserList('');
  }

  ngAfterViewInit() {
    this.onSetCardContainerHeight();
  }

  onSetCardContainerHeight() {
    const tableHeaderHeight = `${this.tableHeader.nativeElement.offsetHeight}px`;
    this.renderer.setStyle(
      this.cardContainer.nativeElement,
      'height',
      `calc(100% - ${tableHeaderHeight})`
    );
  }

  deleteUser(id: number) {
    const dialogRef = this.dialogService.openWarningDialog(
      'Confirmation',
      'Delete this user and all blogs, do you want to continue?',
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        this.isLoading = true;
        this.adminUserService.deleteUser(id).subscribe({
          next: () => {
            this.messageService.openSnackBar(
              'success',
              'Successfully deleted!'
            );
            this.loadUserList(this.keywords);
          },
          error: (error) => {
            this.isLoading = false;
            this.messageService.openSnackBar('error', 'Failed to delete!');
          },
        });
      });

    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        this.messageService.openSnackBar('info', 'Delete canceled');
      });
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  enabledChange(enabled: boolean, id: number, index: number) {
    this.adminUserService.enableUser(enabled, id).subscribe({
      next: () => {
        this.messageService.openSnackBar('success', 'Update completed!');
      },
      error: (error) => {
        this.messageService.openSnackBar('error', 'Update failed!');
        this.loadUserById(id, index);
      },
    });
  }

  loadUserById(id: number, index: number) {
    this.adminUserService.getUserById(id).subscribe({
      next: (user) => {
        this.users.splice(index, 1, user);
      },
    });
  }

  loadUserList(keywords: string) {
    this.adminUserService.getUsers(keywords).subscribe({
      next: (users: User[]) => {
        this.isLoading = false;
        this.users = users;
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.openSnackBar('error', 'Data load failed!');
      },
    });
  }

  searchClick() {
    this.loadUserList(this.keywords);
  }
}
