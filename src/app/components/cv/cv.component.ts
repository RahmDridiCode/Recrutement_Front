import { Component, OnInit } from '@angular/core';
import {CvServiceService} from "../../services/cv-service.service";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  constructor(public cvService: CvServiceService) { }

  ngOnInit(): void {
    const etudiant = this.cvService.etudiant;

    if (!etudiant) {
      console.error("Aucun étudiant trouvé !");
      return;
    }

    const idEtudiant = etudiant.id;

    this.cvService.notifyConsultation(idEtudiant).subscribe({
      next: () => console.log("Notification envoyée"),
      error: (err) => console.error(err)
    });
  }
}
