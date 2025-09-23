import { Component } from '@angular/core';
import { FormClientComponent } from '../form-client/form-client.component';
import { FormQuestionsComponent } from '../form-questions/form-questions.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, FormClientComponent, FormQuestionsComponent],
  template: `
    <div *ngIf="!clientSubmitted">
      <app-form-client 
        [client]="client" 
        (submitted)="onClientSubmitted($event)">
      </app-form-client>
    </div>

    <div *ngIf="clientSubmitted">
      <app-form-questions 
        [client]="client" 
        (back)="onBack()">
      </app-form-questions>
    </div>
  `
})
export class ProcessComponent {
  client: any = { nom: '', prenom: '', sexe: '', taille: 0, poids: 0, reponses: [] };
  clientSubmitted = false;

  onClientSubmitted(clientData: any) {
    this.client = clientData;
    this.clientSubmitted = true;
  }

  onBack() {
    this.clientSubmitted = false;
  }
}

