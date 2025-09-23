import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  constructor(private router: Router) {}

  goToForm() {
    this.router.navigate(['/process']);  // adapte le chemin selon ta config route
  }

  goToList() {
    this.router.navigate(['/clients']); // adapte le chemin selon ta config route
  }
}
