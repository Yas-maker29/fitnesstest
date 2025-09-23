import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { FormClientComponent } from '../form-client/form-client.component';
import { EditQuestionsComponent } from '../edit-questions/edit-questions.component';

@Component({
  selector: 'app-edit-process',
  standalone: true,
  imports: [CommonModule, FormClientComponent, EditQuestionsComponent],
  template: `
    <div *ngIf="!clientSubmitted">
      <app-form-client 
        [client]="client" 
        (submitted)="onClientSubmitted($event)">
      </app-form-client>
    </div>

    <div *ngIf="clientSubmitted">
      <app-edit-questions 
        [client]="client" 
        (back)="onBack()"
        (submitted)="saveChanges()">
      </app-edit-questions>
    </div>
  `
})
export class EditProcessComponent implements OnInit {
  client: any = { nom: '', prenom: '', sexe: '', taille: 0, poids: 0, reponses: [] };
  clientSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private service: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.service.getClientById(clientId).subscribe(res => {
        // Mapper _id → id et supprimer _id pour cohérence avec update
        this.client = { ...res, id: res._id };
        delete this.client._id;
      });
    }
  }

  onClientSubmitted(clientData: any) {
    this.client = clientData;
    this.clientSubmitted = true;
  }

  onBack() {
    this.clientSubmitted = false;
  }

  saveChanges() {
    const clientId = this.client.id; // utilise l'id mappé
    if (!clientId) return;

    // Créer payload sans _id ni id
    const payload = { ...this.client };
    delete payload._id;
    delete payload.id;

    this.service.updateClient(clientId, payload).subscribe(() => {
      console.log('Client mis à jour avec succès !');
    });
  }
}
