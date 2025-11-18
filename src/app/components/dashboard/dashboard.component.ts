import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {JobService} from "../../services/job.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listNav=[true,false,false,false]
  users:any[]=[]
  services:any[]=[]
  studentCount:number=0;
  recruterCount:number=0;
  offersCount:number=0;
  constructor(private router :Router,
              public auth: AuthService, private userService: UserService, private jobService: JobService) { }

  ngOnInit(): void {
    this.userService.getUserAllUsers().subscribe((response:any) =>
    {
      this.users=response;
      let students = this.users.filter(user => user.role ==="STUDENT");
      this.studentCount = students? students.length : 0;
      let recruters = this.users.filter(user => user.role ==="RECRUTER");
      this.recruterCount = recruters? recruters.length : 0;
    })

    this.jobService. listeJobs().subscribe((response:any) =>{
      this.offersCount=response.length;
    })
  }

  logout() {
    this.auth.logout();

  }

  go(index:number,path:string) {
    for(let i=0;i<this.listNav.length;i++){
      this.listNav[i]=false;
    }
    this.listNav[index]=true
    this.router.navigate([path])
  }

}
