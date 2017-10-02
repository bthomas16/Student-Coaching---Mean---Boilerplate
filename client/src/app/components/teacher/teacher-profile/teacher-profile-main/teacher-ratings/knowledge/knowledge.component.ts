import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {
  rating: number;
  processing: boolean = false;
  showRating: boolean = false;
  message;
  messageClass;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  isChecked4: boolean = false;
  isChecked5: boolean = false;


  @Output() knowledgeRated = new EventEmitter<{knowledgeRating: number}>();

  constructor(public authService: AuthService) {

  }

  // Knowledge Rating

  five() {
    this.rating = 5
    this.showRating = true;
    this.isChecked5 = !this.isChecked5;
    this.isChecked4 = false;
    this.isChecked3 = false;
    this.isChecked2 = false;
    this.isChecked1 = false;
    this.knowledgeRated.emit({
      knowledgeRating: this.rating
    });
  }

  four() {
    this.rating = 4;
    this.showRating = true;
    this.isChecked5 = false;
    this.isChecked4 = !this.isChecked4;
    this.isChecked3 = false;
    this.isChecked2 = false;
    this.isChecked1 = false;
    this.knowledgeRated.emit({
      knowledgeRating: this.rating
    });
  }

  three() {
    this.rating = 3;
    this.showRating = true;
    this.isChecked5 = false;
    this.isChecked4 = false;
    this.isChecked3 = !this.isChecked3;
    this.isChecked2 = false;
    this.isChecked1 = false;
    this.knowledgeRated.emit({
      knowledgeRating: this.rating
    });
  }


  two() {
    this.rating = 2;
    this.showRating = true;
    this.isChecked5 = false;
    this.isChecked4 = false;
    this.isChecked3 = false;
    this.isChecked2 = !this.isChecked2;
    this.isChecked1 = false;
    this.knowledgeRated.emit({
      knowledgeRating: this.rating
    });
  }


  one() {
    this.rating = 1;
    this.showRating = true;
    this.isChecked5 = false;
    this.isChecked4 = false;
    this.isChecked3 = false;
    this.isChecked2 = false;
    this.isChecked1 = !this.isChecked1;
    this.knowledgeRated.emit({
      knowledgeRating: this.rating
    });
  }


  ngOnInit() {
  }

}
