import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student:any;
  bool=false;
  isLoading = false;
  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
  }

  getStudent(enroll: any,firstname:any) {
    this.isLoading = true;
    this.schoolService.getStudents(enroll,firstname).subscribe(data => {
      this.student = data;
      this.bool = true;
      console.log(this.student);
      this.isLoading =false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    })
  }


}
