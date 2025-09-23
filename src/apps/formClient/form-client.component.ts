import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-client.component.html',
})
export class FormClientComponent {
   constructor(private router: Router) {}
  @Input() client: any = { 
    nom: '', 
    prenom: '', 
    sexe: '', 
    taille: undefined, 
    poids: undefined, 
    reponses: [] 
  }; 
  @Output() submitted = new EventEmitter<any>();

  showModal: boolean = false;

  submit() {
    if (this.client.taille != null && this.client.poids != null) {
      this.client.poidsIdeal = this.client.sexe === 'H' 
        ? 50 + 0.91 * (this.client.taille - 152.4) 
        : 45.5 + 0.91 * (this.client.taille - 152.4);

      const diff = this.client.poids - this.client.poidsIdeal;

      if (diff > 5) {
        this.client.conseil = "Bei Übergewicht ist regelmäßige Bewegung und eine ausgewogene Ernährung ratsam.";
      } else if (diff < -5) {
        this.client.conseil = "Bei Untergewicht empfiehlt es sich, die Kalorienzufuhr zu erhöhen und Übungen zum Muskelaufbau durchzuführen.";
      } else {
        this.client.conseil = "Ihr Gewicht liegt im Normalbereich. Behalten Sie Ihre gesunden Gewohnheiten bei, um in Form zu bleiben.";
      }
    } else {
      this.client.poidsIdeal = null;
      this.client.conseil = "Bitte geben Sie Ihre Größe und Ihr Gewicht ein, um eine persönliche Beratung zu erhalten.";
    }

    // Afficher le popup animé
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    // Émettre l'événement pour le parent afin de passer au formulaire questions
    this.submitted.emit(this.client);
  }
    goHome() {
    this.router.navigate(['/']); // Accueil
  }

  goList() {
    this.router.navigate(['/clients']); // Liste des clients
  }
}
