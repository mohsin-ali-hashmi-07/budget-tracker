import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'role','actions'];
  dataSource = new MatTableDataSource<any>([]); 
  private dialog = inject(MatDialog); 
  private userService = inject(UserService); 
private userDetails = inject (UserDetailsService)
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort; 

  totalItems = signal(0); 
  pageSize = signal(8);
  pageIndex = signal(0); 

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on initialization
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator
    this.dataSource.sort = this.sort; // Set sort
  }

  // Computed property for range label
  rangeLabel = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize() + 1;
    return `Showing ${startIndex} / ${this.totalItems()}`;
  });

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }

  fetchUsers(): void {
    const currentUser = this.userDetails.getCurrentUser();
    this.userService.getAllUsers().subscribe({
      next: (users: any) => {
        const filteredUsers = users.filter((user: any) => user.id !== currentUser.id);

        this.dataSource.data = filteredUsers.map((user: any) => (
          {
          
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          budget_limit: user.budget_limit,
          phone_number: user.phone_number
        }));
        this.totalItems.set(users.length);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  openDialog(mode: 'edit' | 'delete', user?: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: { mode, user },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`${result.mode} User:`, result);
        this.fetchUsers(); // Refresh the user list
      }
    });
  }
}
