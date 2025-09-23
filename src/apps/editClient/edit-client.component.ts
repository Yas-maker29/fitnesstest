import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-client.component.html'
})
export class EditClientComponent implements OnInit {
  client: any = { nom: '', prenom: '', sexe: '', taille: undefined, poids: undefined, reponses: [] };
  showModal: boolean = false;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.getClientById(this.id).subscribe(client => {
      // On mappe _id → id et on supprime _id
      this.client = { ...client, id: client._id };
      delete this.client._id;
    });
  }

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

    // Préparation du payload sans _id
    const payload = { ...this.client };
    delete payload._id;

    // Mise à jour via le service
    this.service.updateClient(this.id, payload).subscribe(() => {
      this.showModal = true;
    });
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/clients']); // Retour à la liste après édition
  }
}
