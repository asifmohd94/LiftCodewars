import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getStudents(enroll: number, firstname: string) {
    let url = 'http://localhost:7800/api/school/student';
    return this.http.get(url, {
      params: new HttpParams().set('enroll', enroll).set('firstname', firstname)
    });
  }

  getTeacher(name: string) {
    let url = 'http://localhost:7800/api/school/teacher';
    return this.http.get(url, {
      params: new HttpParams().set('name', name)
    })
  }

  studentAddmission(enroll_number: number, first_name: string, last_name: string, dob: Date, fathers_name: string, mothers_name: string, address: string, gender: string, contact_phone: string, session_id: number, addmission_grade: number) {
    console.log(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender, session_id, addmission_grade)
    let url = 'http://localhost:7800/api/school/student/addmission';
    return this.http.post(url, {
      enroll_number,
      first_name,
      last_name,
      dob,
      fathers_name,
      mothers_name,
      address,
      gender,
      contact_phone,
      session_id,
      addmission_grade
    });
  }

}
