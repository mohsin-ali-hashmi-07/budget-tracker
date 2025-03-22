import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right', 
    verticalPosition: 'top',
  };


  showToast(message: string, type: 'success' | 'danger' | 'info'): void {
  
    const panelClass = this.getPanelClass(type);
    this.snackBar.open(message, 'Close', {
      ...this.defaultConfig, 
      panelClass,
    });
  }

  private getPanelClass(type: 'success' | 'danger' | 'info'): string[] {
    switch (type) {
      case 'success':
        return ['success-toast'];
      case 'danger':
        return ['danger-toast'];
      case 'info':
        return ['info-toast'];
      default:
        return [];
    }
  }
}
