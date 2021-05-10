import { Component, OnInit } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService]
})
export class AppComponent implements OnInit{
  title = 'Home';

  constructor(
    public router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void{
  }
}
