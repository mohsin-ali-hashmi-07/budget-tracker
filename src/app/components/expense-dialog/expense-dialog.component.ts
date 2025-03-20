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

interface ExpenseData {
  mode: 'add' | 'edit' | 'delete';
  expense?: { title: string; price: number; date: string };
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

  expenseForm = new FormGroup({
    title: new FormControl({ value: this.data.expense?.title || '', disabled: this.data.mode === 'delete' }, Validators.required),
    price: new FormControl({ value: this.data.expense?.price || '', disabled: this.data.mode === 'delete' }, [Validators.required, Validators.min(1)]),
    date: new FormControl({ value: this.data.expense?.date || '', disabled: this.data.mode === 'delete' }, Validators.required)
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

  onSave() {
    if (this.expenseForm.valid || this.data.mode === 'delete') {
      this.dialogRef.close({ ...this.expenseForm.value, mode: this.data.mode });
    }
  }
}
