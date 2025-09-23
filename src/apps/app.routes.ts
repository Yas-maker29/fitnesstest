import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ClientsComponent } from './clients/clients.component';
import { ProcessComponent } from './process/process.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProcessComponent } from './edit-process/edit-process.component';

export const routes: Routes = [
  { path: '', component: AcceuilComponent }, 
  { path: 'process', component: ProcessComponent },
  { path: 'clients', component: ClientsComponent },
{ path: 'edit/:id', component: EditProcessComponent },
  { path: '**', redirectTo: '' } 
];

