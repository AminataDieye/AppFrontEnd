import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeTacheComponent } from './component/liste-tache/liste-tache.component';
import { AjouterTacheComponent } from './component/ajouter-tache/ajouter-tache.component';
import { ModifierTacheComponent } from './component/modifier-tache/modifier-tache.component';



const routes: Routes = [
  { path: "lister-tache", component: ListeTacheComponent },
  { path: "ajouter-tache", component: AjouterTacheComponent },
  { path: "modifier-tache/:id", component: ModifierTacheComponent },

  { path: "", redirectTo: "lister-tache", pathMatch: "full" },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
