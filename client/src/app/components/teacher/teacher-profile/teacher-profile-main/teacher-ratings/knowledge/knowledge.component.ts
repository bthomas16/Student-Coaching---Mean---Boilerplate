import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {
  kRatings: any[];
  kRating: number;
  avgKnowledgeRating: number;
  showKRating: boolean = false;
  processing: boolean = false;
  avgRating: number = 0;
  sum: number = 0;
  message;
  messageClass;

  @Output() knowledgeRated = new EventEmitter<{knowledgeRating: number}>();

  constructor(public authService: AuthService) {

  }

  // Knowledge Rating


  kfive() {
    this.kRating = 5
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  kfourhalf() {
    this.kRating = 4.5;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  kfour() {
    this.kRating = 4;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  kthreehalf() {
    this.kRating = 3.5;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  kthree() {
    this.kRating = 3;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  ktwohalf() {
    this.kRating = 2.5;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  ktwo() {
    this.kRating = 2;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  konehalf() {
    this.kRating = 1.5;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  kone() {
    this.kRating = 1;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  khalf() {
    this.kRating = 0.5;
    this.showKRating = true;
    this.knowledgeRated.emit({
      knowledgeRating: this.kRating
    });
  }

  ngOnInit() {
  }

}
