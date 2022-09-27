import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AboutJobsComponent } from './components/about-jobs/about-jobs.component';
import { AboutEducationComponent } from './components/about-education/about-education.component';
import { AboutSkillsComponent } from './components/about-skills/about-skills.component';
import { AboutProjectsComponent } from './components/about-projects/about-projects.component';
import { MuseComponent } from './components/muse/muse.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AbmService } from './servicios/Abm/abm.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutMeComponent,
    AboutJobsComponent,
    AboutEducationComponent,
    AboutSkillsComponent,
    AboutProjectsComponent,
    MuseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AbmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
