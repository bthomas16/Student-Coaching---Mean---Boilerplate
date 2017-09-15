import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  email;
  fullname;
  isStudent;
  isTeacher;
  imgForm;
  message;
  messageClass;
  selectedFile;

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(public authService: AuthService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
}

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

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:8080/api/avatar-upload',
      method: 'POST',
      concurrency: 0
    };

    this.uploadInput.emit(event);
  }
// onChange(event) {
//   this.selectedFile = event.target.files[0];
//   console.log('selecting this file here:', this.selectedFile);
// }
//
//   onFileSubmit() {
//     // const avatar = {name: this.selectedFile.name, size: this.selectedFile.size, type: this.selectedFile.type, webkitRelativePath: "uploads/", lastModified: this.selectedFile.lastModified, lastModifiedDate: this.selectedFile.lastModifiedDate}
//     const avatar = this.selectedFile;
//     console.log('howdy', avatar)
//     this.authService.fileSubmit(avatar).subscribe(data => {
//       if (!data.success) {
//         this.messageClass = 'alert alert-danger';
//         this.message = data.message;
//       } else {
//         this.messageClass = 'alert alert-success'
//         this.message = data.message
//       }
//     });
//   }

ngOnInit() {
  this.authService.getProfile()
  .subscribe(profile => {
    this.fullname = profile.user.fullname.toUpperCase();
    this.email = profile.user.email;
    this.isStudent = profile.user.isStudent;
    this.isTeacher = profile.user.isTeacher;
  });
}

}
