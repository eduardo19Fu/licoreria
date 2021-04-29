import { Component } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService]
})
export class AppComponent {
  title = 'Home';

  constructor(
    public router: Router
  ){}
}
