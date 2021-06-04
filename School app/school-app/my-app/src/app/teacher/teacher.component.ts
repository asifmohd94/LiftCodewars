import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher: any;
  bool = false;
  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
  }

  getTeacher(name: string) {
    this.schoolService.getTeacher(name).subscribe(data => {
    this.teacher = data;
    this.bool = true;
    console.log(this.teacher);
    }, err => {
    console.log(err);
    })
  }

}
