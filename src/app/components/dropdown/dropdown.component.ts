import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  isOpen = false;
  private elementRef = inject(ElementRef);

  toggleDropdown() {
    console.log("hello world")
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
