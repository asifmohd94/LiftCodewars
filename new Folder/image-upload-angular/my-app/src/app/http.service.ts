import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  uploadService(url: string, formData: FormData) {
    return this.http.post(url, formData);

  }

  getImageService() {
    let url = "http://localhost:7800/api/get";
    return this.http.get(url);
  }

}



