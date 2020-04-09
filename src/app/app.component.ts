import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType ,HttpHeaders} from '@angular/common/http';
 
@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class ImageUploadWithPreviewComponent implements OnInit {
 
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }
   
  ngOnInit() {
  }
   
  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
  }
 
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append("File", this.fileData,this.fileData.name);
    if(formData==null)
    {
      alert("Please upload Valid File");
    }
    this.fileUploadProgress = '0%';
    const headers = new HttpHeaders().append('accept', 'application/json');
    
    this.http.post('https://localhost:44381/api/FilesUpload', formData ,{

      headers:headers,
      reportProgress: true,
      
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
      
         alert('SUCCESS !!');
      }
         
    }) 
}
}
