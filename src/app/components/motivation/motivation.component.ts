import { Component, OnInit } from '@angular/core';
import {MotivationService} from "../../services/motivation.service";

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {

  constructor( public motivationService: MotivationService ) { }

  ngOnInit(): void {
  }

}
