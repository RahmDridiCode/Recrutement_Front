import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {ToastrService} from "ngx-toastr";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  message! :string;
  keywordsArray: string[] = []; // tableau des tags
  separatorKeys: number[] = [ENTER, COMMA];

  invalid=false;
  jobOffer = new FormGroup({
    service: new FormControl('',[Validators.required]),
    ville: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  constructor(private jobService : JobService,private router : Router,private authService : AuthService,  private toastr: ToastrService ) { }
  ngOnInit(): void {
  }

  addKeyword(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value && !this.keywordsArray.includes(value)) {
      this.keywordsArray.push(value);
    }
    event.chipInput!.clear();
  }

  removeKeyword(index: number) {
    this.keywordsArray.splice(index, 1);
  }



  addJob() {
    if(this.jobOffer.valid){
      let job =  {
        date: this.jobOffer.value.date,
        description: this.jobOffer.value.description,
        service: this.jobOffer.value.service,
        address: this.jobOffer.value.address,
        ville: this.jobOffer.value.ville,
        keywords: this.keywordsArray
      };

      this.jobService.ajouterJob(job).subscribe({
        next: (result) => {
          this.toastr.success('Votre annonce a été postée avec succès !', 'Succès'); // ✅ toast vert
          console.log(result);
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.toastr.error('Erreur lors de la publication de l’annonce.', 'Échec'); // ❌ toast rouge
          console.error(err);
        }
      });
    } else {
      this.toastr.warning('Veuillez remplir correctement le formulaire.', 'Attention'); // ⚠️ toast jaune
      this.invalid = true;
    }
  }

}
