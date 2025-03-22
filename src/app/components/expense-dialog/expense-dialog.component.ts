import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserDetailsService } from '../../services/user-details.service';
import { ToastService } from '../../services/toast.service';

interface ExpenseData {
  mode: 'add' | 'edit' | 'delete';
  expense?: { expense: string; price: number; date: string, id:number, total_Expenditure: string };
}

@Component({
  selector: 'app-expense-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss'
})
export class ExpenseDialogComponent {
  dialogRef = inject(MatDialogRef<ExpenseDialogComponent>);
  data: ExpenseData = inject(MAT_DIALOG_DATA, { optional: true }) || { mode: 'add' };
  private userService = inject(UserService)
  private userDetails = inject(UserDetailsService)
  private toastService = inject(ToastService)

  expenseForm = new FormGroup({
    expense: new FormControl({ value: this.data.expense?.expense || '', disabled: this.data.mode === 'delete' }, Validators.required),
    price: new FormControl({ value: this.data.expense?.price || 0, disabled: this.data.mode === 'delete' }, [Validators.required, Validators.min(1)]),
    date: new FormControl({ value: this.data.expense?.date ? new Date(this.data.expense.date) : null, disabled: this.data.mode === 'delete' }, Validators.required)
  });


  get dialogTitle() {
    return this.data.mode === 'edit' ? 'Edit Expense' : this.data.mode === 'delete' ? 'Delete Expense' : 'Add Expense';
  }

  get actionButtonLabel() {
    return this.data.mode === 'edit' ? 'Save Changes' : this.data.mode === 'delete' ? 'Delete' : 'Add';
  }

  onCancel() {
    this.dialogRef.close();
  }

  generateUserId(): number {
    return Math.floor(Math.random() * 1000000); 
  }

  onSave() {
    if (this.expenseForm.valid || this.data.mode === 'delete') {
      const newUserId = this.generateUserId();

      const formData = this.expenseForm.value;
      const expenseToSave: any = {
        ...formData,
        total_Expenditure: this.data.expense?.total_Expenditure,
        date: formData.date ? new Date(formData.date).getTime() : null, // Convert Date to timestamp
        id: this.data.expense?.id ? this.data.expense?.id : newUserId, 
      };


      const currentUser = this.userDetails.getCurrentUser(); 
      const userId = currentUser.id; 
      switch (this.data.mode) {
        case 'add':
          this.userService.addExpense(userId, expenseToSave).subscribe({
            next: (response) => {
              
              this.toastService.showToast('expense added successfully', 'success');
              this.dialogRef.close({ ...expenseToSave, mode: 'add' });
            },
            error: (error) => {
              this.toastService.showToast('Error adding expense', 'danger');
              
              console.error('Error adding expense:', error);
            },
          });
          break;

        case 'edit':
          if (expenseToSave.id) {
            this.userService.updateExpense(userId, expenseToSave.id, expenseToSave).subscribe({
              next: (response) => {
                this.toastService.showToast('expense edited successfully', 'success');
                this.dialogRef.close({ ...expenseToSave, mode: 'edit' });
              },
              error: (error) => {
                this.toastService.showToast('Error updating expense', 'danger');

                console.error('Error updating expense:', error);
              },
            });
          }
          break;

        case 'delete':
          if (expenseToSave.id) {
            this.userService.deleteExpense(userId, expenseToSave.id).subscribe({
              next: (response) => {
                this.toastService.showToast('expense deleted successfully', 'success');
                this.dialogRef.close({ ...expenseToSave, mode: 'delete' });
              },
              error: (error) => {
                this.toastService.showToast('Error deleting expense', 'danger');
                console.error('Error deleting expense:', error);
              },
            });
          }
          break;

        default:
          console.error('Invalid mode:', this.data.mode);
          break;
      }
    }
  }
}
