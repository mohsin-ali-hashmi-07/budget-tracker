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
  displayedColumns: string[] = ['expense', 'totalExpenditure', 'price', 'date', 'user', 'actions'];
  dataSource = new MatTableDataSource(EXPENSES_DATA);
  private dialog = inject(MatDialog);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalItems = signal(235);
  pageSize = signal(8);
  pageIndex = signal(0);


  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Computed Signal to Generate Custom Range Label
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

  openDialog(mode: 'add' | 'edit' | 'delete', expense?: { title: string; price: number; date: string }) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '450px',
      data: { mode, expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`${mode} Expense:`, result);
      }
    });
  }
}

const EXPENSES_DATA = [
  { expense: 'Prestigious Clientele Segment', totalExpenditure: 50, price: '25,000', date: '22 Jan 2022', user: 'guy-hawkins' },
  { expense: 'Luxury Lifestyle Patrons', totalExpenditure: 100, price: '510', date: '22 Feb 2023', user: 'wade-warren' },
  { expense: 'Premium Customers', totalExpenditure: 60, price: '17,420', date: '22 Mar 2021', user: 'jenny-wilson' },
  { expense: 'Exclusive High-Spending Patrons', totalExpenditure: 70, price: '2,500', date: '22 Apr 2024', user: 'robert-fox' },
  { expense: 'Affluent Consumer Segment', totalExpenditure: 20, price: '925', date: '22 May 2024', user: 'williamson' },
];

