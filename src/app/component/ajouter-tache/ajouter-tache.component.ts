import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-tache',
  templateUrl: './ajouter-tache.component.html',
  styleUrls: ['./ajouter-tache.component.css']
})
export class AjouterTacheComponent implements OnInit {
  submitted = false;
  tacheForm: FormGroup;
  constructor(private tacheService : ApiService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,)
     { this.mainForm();}

  ngOnInit(): void {
  }
  mainForm() {
    this.tacheForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],

    })
  }
 
   
  get myForm(){
    return this.tacheForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.tacheForm.valid) {
      return false;
    } else {
      if (window.confirm('Voulez vous ajouter cette tâche?')) {
      
      this.tacheService.ajouterTache(this.tacheForm.value).subscribe(
        (res) => {
          console.log('Tâche créee!')
          this.ngZone.run(() => this.router.navigateByUrl('/lister-tache'))
        }, (error) => {
          console.log('Erreur, tâche non crée');
        });
      }
    }
  }
  
}
