import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ExpenseDialogComponent } from '../../components/expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-expenses-dashboard',
  imports: [CommonModule, MatTableModule,
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
  templateUrl: './expenses-dashboard.component.html',
  styleUrl: './expenses-dashboard.component.scss'
})
export class ExpensesDashboardComponent {
  displayedColumns: string[] = ['expense', 'totalExpenditure', 'price', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private userDetails = inject(UserDetailsService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalItems = signal(0);
  pageSize = signal(8);
  pageIndex = signal(0);

  ngOnInit(): void {
    this.fetchExpenses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  rangeLabel = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize() + 1;
    // const endIndex = Math.min((this.pageIndex() + 1) * this.pageSize(), this.totalItems());
    return `Showing ${startIndex} / ${this.totalItems()}`;
  });


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }

  fetchExpenses(): void {
    const user = this.userDetails.getCurrentUser();
    this.userService.getUserById(user.id).subscribe({
      next: (user: any) => {
        const budgetLimit = user[0].budget_limit ?? 0;
        const expenses = user[0].expenses || [];
        this.dataSource.data = expenses.map((expense: any) => {
          const price = expense.price ?? 0;
          const totalExpenditure = budgetLimit > 0 ? Math.round((price / budgetLimit) * 100): '0%';
          return {
            id: expense.id,
            expense: expense.expense,
            totalExpenditure,
            price: expense.price,
            date: expense.date,
          }
        }

        );
        this.totalItems.set(expenses.length);
      }
    });
  }

  openDialog(mode: 'add' | 'edit' | 'delete', expense?: { expense: string; price: number; date: number, id: number, total_Expenditure: string }) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '450px',
      data: { mode, expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchExpenses();
      }
    });
  }
}

