import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GridLayoutComponent } from "../../components/grid-layout/grid-layout.component";

@Component({
  selector: 'app-login',
  imports: [GridLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  imagePath = 'assets/images/loginImage.svg';
}
