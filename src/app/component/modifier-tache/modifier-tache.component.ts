import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tache } from 'src/app/model/tache';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.css']
})
export class ModifierTacheComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  tacheData: Tache[];


  ngOnInit() {
    this.modifierTache();
    
  }
  
  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private tacheService: ApiService,
    private router: Router)

     { var id = this.actRoute.snapshot.paramMap.get('id');
     this.tacheService.getTache(id).subscribe(data => {
       this.editForm = this.fb.group({
         titre: [data.titre, [Validators.required]],
         description: [data.description, [Validators.required]],
         date : [data.date, [Validators.required]]
       })      
     })  }

  get myForm() {
    return this.editForm.controls;
  }
    
    modifierTache() {
      this.editForm = this.fb.group({
        titre: ['', [Validators.required]],
        description: ['', [Validators.required]],
        date: ['', [Validators.required]],

      })
    }

  
      onSubmit() {
        this.submitted = true;
        if (!this.editForm.valid) {
          return false;
        } else {
          if (window.confirm('Voulez vous modifier cette tâche?')) {
            let id = this.actRoute.snapshot.paramMap.get('id');
            this.tacheService.modifierTache(id, this.editForm.value)
              .subscribe(res => {
                this.router.navigateByUrl('/lister-tache');
                console.log('Tâche modifiée avec succes!')
              }, (error) => {
                console.log(error)
              })
          }
        }
      
    }
   

}
