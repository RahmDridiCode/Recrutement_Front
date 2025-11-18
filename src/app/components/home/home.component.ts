import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';
import { PostulationService } from 'src/app/services/postulation.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  ville: string | null = null;
  service: string | null = null;
  readonly cities = ['Tunis', 'Sousse', 'Sfax', 'Nabeul', 'Monastir', 'Bizerte'];
  readonly domains = ['Informatique', 'Marketing', 'Design', 'Finance', 'RH', 'Communication'];

  constructor(private jobService: JobService, public auth: AuthService,
              public postulService: PostulationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.jobService.listeJobs().subscribe((jobs: any) => {
      this.jobs = jobs || [];
      this.filteredJobs = [...this.jobs];
    });
  }

  applyFilters(city: string, domain: string): void {
    this.ville = city && city !== 'all' ? city : null;
    this.service = domain && domain !== 'all' ? domain : null;

    this.filteredJobs = this.jobs.filter(job => {
      const matchCity = this.ville ? job.ville === this.ville : true;
      const matchService = this.service ? job.service === this.service : true;
      return matchCity && matchService;
    });
  }

  postuler(offreId:number){
    this.postulService.verifyPostulation(offreId).subscribe((result:any)=>{
      console.log(result);
      this.dialog.open(PopupComponent, {
        data: {
          offreId:offreId,
          message: result.message,
        },
      });
    },(error)=>{
      this.dialog.open(PopupComponent, {
        data: {
          message: error.error.message,
          error: error.error.failed,
        },
      });
    })
  }

}
