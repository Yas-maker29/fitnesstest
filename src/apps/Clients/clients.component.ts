import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service'; // importe ton service
import { CommonModule } from '@angular/common';


interface Client {
  _id?: string;
  nom: string;
  prenom: string;
  sexe: string;
  taille: number;
  poids: number;
  poidsIdeal?: number;
  conseil?: string;
  conclusion?: string;
}

@Component({
  selector: 'app-clients',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  // 📋 Récupérer tous les clients
  getClients() {
    this.sharedService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  // ❌ Supprimer un client
  deleteClient(id: string | undefined) {
    if (!id) return;
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.sharedService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(c => c._id !== id);
      });
    }
  }

  // ✏️ Éditer un client
  editClient(client: Client) {
    if (!client._id) return;
    // ✅ Redirection vers la page d'édition avec l'ID du client
    this.router.navigate(['/edit', client._id]);

  }
    goHome() {
    this.router.navigate(['/']); // redirige vers l'accueil
  }

  addClient() {
    this.router.navigate(['/process']); // redirige vers le formulaire d'ajout
  }

}
