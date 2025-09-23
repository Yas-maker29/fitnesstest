import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = 'http://localhost:3000/api/client';

  constructor(private http: HttpClient) { }

  // ➕ Ajouter un client
  addClient(client: any): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  // 📋 Récupérer tous les clients
  getClients(): Observable<any> {
    return this.http.get(this.apiUrl.replace('client', 'clients'));
  }

  // ✏️ Mettre à jour un client
  updateClient(id: string, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, client);
  }

  // ❌ Supprimer un client
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // 📌 Récupérer un client par ID
getClientById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

}
