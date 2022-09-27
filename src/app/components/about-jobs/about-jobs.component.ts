import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from 'src/app/Models/JobModel';
import { JobService } from 'src/app/servicios/Job/job.service';

@Component({
  selector: 'app-about-jobs',
  templateUrl: './about-jobs.component.html',
  styleUrls: ['./about-jobs.component.css']
})
export class AboutJobsComponent implements OnInit {

  constructor(private service:JobService, private router:Router) { }
  jobs: JobModel = new JobModel; 
  private jobsList: Array<JobModel> = [];
  public awesomeJobs: Array<JobModel> = [];
  public surviveJobs: Array<JobModel> = [];
  public dreamJobs: Array<JobModel> = [];

  ngOnInit(): void {
    this.service.getAllJobs().subscribe(data =>{
      this.jobsList = data;
      this.jobsList.forEach(job => {
        switch(job.type){
          case "Making a Living": this.surviveJobs.push(job); break;
          case "Great Experiences": this.awesomeJobs.push(job); break;
          case "Dream Job": this.dreamJobs.push(job); break;
        }
      });
    })
  }
  
}

