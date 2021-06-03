import { Component } from '@angular/core';
import { image } from './img';
import { DomSanitizer } from '@angular/platform-browser'
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  imageUrl!: any;
  images: any;
  constructor(private data: HttpService, private sanitizer: DomSanitizer) { }

  upload(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.images = file;

  }

  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.images);

    this.data.uploadService("http://localhost:2800/api/post", formData).subscribe((d) => {
      console.log(d);
    }, (err) => {
      console.log(err);
    })

  }












  b:any[]=[]
  getImage() {
    this.data.getImageService().subscribe((d:any) => {
      console.log(d);
      let iterable=d;
      
      // @ts-ignore
      let y=0;
      for(let x of d.encode){
         this.b[y]= this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64,${x.encode}`);
         console.log(this.b[y]);
         y++;
      }
         // this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64,${d.encode}`);


    })


  }

}