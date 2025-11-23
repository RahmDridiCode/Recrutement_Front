import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostulationService} from "../../services/postulation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, error: string,offreId:number}, public postulService: PostulationService, private toastr: ToastrService) { }

  ngOnInit(): void {


  }

  submit(fileCV: any, fileMotivation: any) {
    const cv: File = fileCV.files[0];
    const motivationFile: File = fileMotivation.files[0];

    if (!cv ) {
      this.toastr.warning('Veuillez joindre un CV.', 'Attention');
      return;
    }

    this.postulService.addPostulation(this.data.offreId, motivationFile,cv,).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('Votre candidature a été envoyée avec succès !', 'Succès'); // ✅ toast vert
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de l’envoi de la candidature.', 'Échec'); // ❌ toast rouge
      }
    });
  }


}
