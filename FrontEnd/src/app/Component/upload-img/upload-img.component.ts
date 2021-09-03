import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      this.upload(0, this.selectedFiles[0], this.selectedFiles.length);
    }

  }
  upload(idx: number, file: File, max: number): void {
    if (idx < max) {
      this.progressInfos[idx] = { value: 0, fileName: file.name };
      if (file) {
        this.uploadF(file).subscribe(
          (event: any) => {
            
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              const msg = 'Uploaded the file successfully: ' + file.name;
              this.message.push(msg);
              if (this.selectedFiles) this.upload(idx + 1, this.selectedFiles[idx + 1], max);
            }
          },
          (err: any) => {
            this.progressInfos[idx].value = 0;
            const msg = 'Could not upload the file: ' + file.name + " " + err.error.error;
            this.message.push(msg);
            if (this.selectedFiles) this.upload(idx + 1, this.selectedFiles[idx + 1], max);
          });
      }
    }

  }
  uploadF(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.baseUrl}${ApiPaths.File}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
