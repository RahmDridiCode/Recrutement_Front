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
  jobOffer = new FormGroup({
    service: new FormControl('',[Validators.required]),
    ville: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  constructor(private jobService : JobService,private router : Router,private authService : AuthService) { }





  ngOnInit(): void {


  }


  addJob() {
    // console.log(this.newJob);
    if(this.jobOffer.valid){
      let job =  { date : this.jobOffer.value.date, description:this.jobOffer.value.description, service : this.jobOffer.value.service , address : this.jobOffer.value.address, ville : this.jobOffer.value.ville }
      this.jobService.ajouterJob(job).subscribe((result) =>{
        this.message = "Votre annonce posté " ;
        console.log(result);
        this.router.navigate(["/"]);
        //this.router.navigate(["/job"]);
      })
    }else{
      this.invalid=true;
    }
  }

}
