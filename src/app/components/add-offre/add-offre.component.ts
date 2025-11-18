import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  message! :string;

  invalid=false;
  isRecruiter = false;
  isSubmitting = false;
  cities = [
    'Ariana','Béja','Ben Arous','Bizerte','Gabès','Gafsa','Jendouba','Kairouan','Kasserine','Kébili','Le Kef','Mahdia','La Manouba','Médenine','Monastir','Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse','Tataouine','Touzeur','Tunis','Zaghouan'
  ];
  domains = ['Informatique','Mécanique','Electrique','Génie Civil','Science','Langues','Gestion','Marketing','Finance','Economie','Art','Droit','Autre'];
  jobOffer = new FormGroup({
    service: new FormControl('',[Validators.required]),
    ville: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  constructor(private jobService : JobService,private router : Router,public authService : AuthService) { }





  ngOnInit(): void {


    this.isRecruiter = !!this.authService.isRH();
  }


  addJob() {
    if(!this.isRecruiter){
      this.message = "Seuls les recruteurs peuvent ajouter des offres.";
      return;
    }
    if(this.jobOffer.valid){
      this.isSubmitting = true;
      let job =  { date : this.jobOffer.value.date, description:this.jobOffer.value.description, service : this.jobOffer.value.service , address : this.jobOffer.value.address, ville : this.jobOffer.value.ville }
      this.jobService.ajouterJob(job).subscribe((result) =>{
        this.message = "Votre annonce a été publiée." ;
        console.log(result);
        this.isSubmitting = false;
        this.router.navigate(["/"]);
      },()=>{
        this.isSubmitting = false;
      })
    }else{
      this.invalid=true;
    }
  }

  navigateHome(){
    this.router.navigate(["/"]);
  }

}
