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
import { ToastService } from '../../services/toast.service';

interface UserData {
  mode: 'edit' | 'delete'; 
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: number;
    budget_limit?: number;
  };
}

@Component({
  selector: 'app-user-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  dialogRef = inject(MatDialogRef<UserDialogComponent>);
  data: UserData = inject(MAT_DIALOG_DATA, { optional: true }) || { mode: 'edit' };
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  // User form
  userForm = new FormGroup({
    first_name: new FormControl(
      { value: this.data.user?.first_name || '', disabled: this.data.mode === 'delete' },
      Validators.required
    ),
    last_name: new FormControl(
      { value: this.data.user?.last_name || '', disabled: this.data.mode === 'delete' },
      Validators.required
    ),
    email: new FormControl(
      { value: this.data.user?.email || '', disabled: this.data.mode === 'delete' },
      [Validators.required, Validators.email]
    ),
    phone_number: new FormControl(
      { value: this.data.user?.phone_number || null, disabled: this.data.mode === 'delete' }
    ),
    budget_limit: new FormControl(
      { value: this.data.user?.budget_limit || null, disabled: this.data.mode === 'delete' }
    ),
  });

  // Dialog title based on mode
  get dialogTitle() {
    return this.data.mode === 'edit' ? 'Edit User' : 'Delete User';
  }

  // Action button label based on mode
  get actionButtonLabel() {
    return this.data.mode === 'edit' ? 'Save Changes' : 'Delete';
  }

  // Handle cancel action
  onCancel() {
    this.dialogRef.close();
  }

  // Handle save/delete action
  onSave() {
    if (this.userForm.valid || this.data.mode === 'delete') {
      const formData = this.userForm.value;
      console.log("formData", formData,  "this.data.user", this.data.user)
      const userToSave = {
        ...this.data.user, // Preserve existing user data
        ...formData, // Override with updated form data
      };

      const userId = this.data.user?.id; // Get the user ID

      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      switch (this.data.mode) {
        case 'edit':
          this.userService.updateUser(userId, userToSave).subscribe({
            next: (response) => {
              this.toastService.showToast('User updated successfully', 'success');
              this.dialogRef.close({ ...userToSave, mode: 'edit' });
            },
            error: (error) => {
              this.toastService.showToast('Error updating user', 'danger');
              console.error('Error updating user:', error);
            },
          });
          break;

        case 'delete':
          this.userService.deleteUser(userId).subscribe({
            next: (response) => {
              this.toastService.showToast('User deleted successfully', 'success');
              this.dialogRef.close({ ...userToSave, mode: 'delete' });
            },
            error: (error) => {
              this.toastService.showToast('Error deleting user', 'danger');
              console.error('Error deleting user:', error);
            },
          });
          break;

        default:
          console.error('Invalid mode:', this.data.mode);
          break;
      }
    }
  }
}
