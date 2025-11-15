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
    console.log();
  }
}
