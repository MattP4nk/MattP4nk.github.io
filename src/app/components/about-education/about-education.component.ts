import { Component, OnInit } from '@angular/core';
import { EduService } from 'src/app/servicios/Edu/edu.service';
import { Router } from '@angular/router';
import { EduModel } from 'src/app/Models/EduModel';

@Component({
  selector: 'app-about-education',
  templateUrl: './about-education.component.html',
  styleUrls: ['./about-education.component.css']
})
export class AboutEducationComponent implements OnInit {

  constructor(private service:EduService, private router:Router) { }
  edus: EduModel = new EduModel;
  private edusList: Array<EduModel> = [];
  public formalEdus: Array<EduModel> = [];
  public courseEdus: Array<EduModel> = [];
  public hobbiesEdus: Array<EduModel> = [];

  ngOnInit(): void {
    this.service.getAllEdus().subscribe(data =>{
      this.edusList = data;
      this.edusList.forEach(edu => {
        switch(edu.type){
          case "Formal": this.formalEdus.push(edu); break;
          case "Course": this.courseEdus.push(edu); break;
          case "Hobbie": this.hobbiesEdus.push(edu); break;
        }
      })
    })
  }

}
