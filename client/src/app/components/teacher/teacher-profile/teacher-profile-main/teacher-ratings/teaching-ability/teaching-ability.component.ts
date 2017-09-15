import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-teaching-ability',
  templateUrl: './teaching-ability.component.html',
  styleUrls: ['./teaching-ability.component.css']
})
export class TeachingAbilityComponent implements OnInit {
  taRatings: any[];
  taRating: number;
  avgTeachingAbilityRating: number;
  processing: boolean = false;
  showTARating: boolean = false;
  sum: number = 0;
  message;
  messageClass;

  @Output() teachingAbilityRated = new EventEmitter<{teachingAbilityRating: number}>();

  constructor(public authService: AuthService) {
  }

  // Teaching Ability Rating

  tafive() {
    this.taRating = 5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tafourhalf() {
    this.taRating = 4.5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tafour() {
    this.taRating = 4;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tathreehalf() {
    this.taRating = 3.5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tathree() {
    this.taRating = 3;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tatwohalf() {
    this.taRating = 2.5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tatwo() {
    this.taRating = 2;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  taonehalf() {
    this.taRating = 1.5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  taone() {
    this.taRating = 1;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  tahalf() {
    this.taRating = 0.5;
    this.showTARating = true;
    this.teachingAbilityRated.emit({
      teachingAbilityRating: this.taRating
    });
  }

  ngOnInit() {
  }

}
