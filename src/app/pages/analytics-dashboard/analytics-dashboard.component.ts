import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserDetailsService } from '../../services/user-details.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-dashboard',
  imports: [CanvasJSAngularChartsModule, MatCardModule, CommonModule],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.scss'
})
export class AnalyticsDashboardComponent implements OnInit {
  private userService = inject(UserService);
  private userDetails = inject(UserDetailsService);

  isLoading = signal(true); 
  expenses = signal<any[]>([]); 

  lineChartOptions = () => {
    const dataPoints = this.expenses().map((expense) => ({
      label: new Date(expense.date).toLocaleDateString('en-US', { month: 'short' }),
      y: expense.price, 
    }));

    return {
      animationEnabled: true,
     
      theme: 'light2',
      axisY: {
        title: 'Value',
      },
      data: [
        {
          type: 'line',
          dataPoints: dataPoints,
        },
      ],
    };
  };

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    const user = this.userDetails.getCurrentUser(); 

    this.userService
      .getUserById(user.id)
      .pipe(
        switchMap((userData: any) => {
          const expenses = userData[0].expenses || [];
          this.expenses.set(expenses); 
          return of(expenses); 
        }),
        catchError((error) => {
          return of([]); 
        })
      )
      .subscribe(() => {
        this.isLoading.set(false); // Data loaded
      });
  }
}
