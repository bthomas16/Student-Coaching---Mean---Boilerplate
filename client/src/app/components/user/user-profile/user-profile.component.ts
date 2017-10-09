import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  id;
  email;
  fullname;
  isStudent;
  isTeacher;
  selectedFile;
  message;
  messageClass;
  profPic;

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  server = ""


  constructor(public authService: AuthService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
}

@ViewChild("fileInput") fileInput;

onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
        this.files.push(output.file);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
  }

onStartUpload(): void {
  const event: UploadInput = {
      type: 'uploadAll',
      url: "/authentication/avatar-upload/" + this.id,
      method: 'PUT',
      concurrency: 0
    };
    this.uploadInput.emit(event)
  }


ngOnInit() {
  this.authService.getProfile()
  .subscribe(profile => {
    this.id = profile.user._id;
    this.fullname = profile.user.fullname.toUpperCase();
    this.email = profile.user.email;
    this.isStudent = profile.user.isStudent;
    this.isTeacher = profile.user.isTeacher;
    this.profPic = profile.user.profPicName;
    this.profPic = '/authentication/avatar-retrieve/' + this.id
  });
  window.scrollTo(0, 0)
}

}
