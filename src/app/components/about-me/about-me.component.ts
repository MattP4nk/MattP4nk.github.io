import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbmModel } from 'src/app/Models/AbmModel';
import { AbmService } from 'src/app/servicios/Abm/abm.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  
  constructor(private service:AbmService, private router:Router) { }
  abm: AbmModel = new AbmModel;
  ngOnInit(): void {
    this.service.getAbm().subscribe(data=>{
      console.log(data);
      this.abm=data;
    })
    
  }

}
