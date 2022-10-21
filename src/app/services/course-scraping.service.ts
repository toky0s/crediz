import { Injectable } from '@angular/core';
import * as cheerio from 'cheerio';
import { log } from 'console';
import { CourseSemester, CourseYear } from '../models/Course';
import { superCleanText, Textable } from '../utils/TextUtils';

@Injectable({
  providedIn: 'root'
})
export class CourseScrapingService {

  private static readonly COMBOX_YEAR_URL: Textable = new Textable("http://courses.duytan.edu.vn/Modules/academicprogram/ajax/LoadNamHoc.aspx?namhocname=cboNamHoc2&id=2");
  private static readonly COMBOX_SEMESTER_URL: Textable = new Textable("http://courses.duytan.edu.vn/Modules/academicprogram/ajax/LoadHocKy.aspx?hockyname=cboHocKy1&namhoc={CurrentYearValue}");

  constructor() {
  }

  private static async getHtml(url: string): Promise<cheerio.CheerioAPI> {
    try {
      const response = await fetch(url);
      const html: string = await response.text();
      return cheerio.load(html);
    }
    catch (error) {
      throw error;
    }
  }

  async getYears(): Promise<CourseYear[]> {
    const $: cheerio.CheerioAPI = await CourseScrapingService.getHtml(CourseScrapingService.COMBOX_YEAR_URL.format());

    const years: CourseYear[] = [];
    
    $("option")
      .each((_idx, el) => {
        const year: CourseYear = {
          name: superCleanText($(el).text()),
          value: $(el).attr()!['value'].toString(),
        };
        years.push(year);
      });
    
    years.forEach(async y => {
      console.log('year vlaue', y.value);
      y.semesters = await this.getSemester(y.value);
    });

    return years;
  }

  async getSemester(year: string): Promise<CourseSemester[]> {
    const param: Map<string, string> = new Map<string, string>();
    param.set('CurrentYearValue', year);
    const url: string = CourseScrapingService.COMBOX_SEMESTER_URL.format(param);
    console.log('url', url);
    const $: cheerio.CheerioAPI = await CourseScrapingService.getHtml(url);
    const semesters: CourseSemester[] = [];

    $("option")
      .each((_idx, el) => {
        const semester: CourseSemester = {
          name: superCleanText($(el).text()),
          value: $(el).attr()!['value'].toString(),
        };

        semesters.push(semester);
      });

    console.log('semester', semesters);
    return semesters;
  }
}
