import { Component, OnInit } from '@angular/core';
import { CourseScrapingService } from './services/course-scraping.service';
import { DbService } from './services/db.service';
import { ElectronService } from 'ngx-electron';
import { catchError, Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Crediz';

  constructor(
    private courseScrapingSvc: CourseScrapingService,
    private dbSvc: DbService,
    ) {

  }

  ngOnInit(): void {
    this.courseScrapingSvc.getYears().then(
      e => console.log(e)
    )
  }
}
