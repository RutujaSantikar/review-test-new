import { Component, OnInit } from '@angular/core';
import { QzService } from './qz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  base64code!: string;
  imageUrl: any;
  imgElem: any;
  base64String: any;
  showUplod: boolean = false;
  showImage: boolean = false;
  getData: any;
  getData1: any;
  nquestion: any;
  nquestion1: any;
  correctOption: any;
  selectedValue: any='';
  selectedValueImage: any;
  valueImage: any='';
  isLoaded= false;
  lang=true



  constructor(private qzService: QzService) {}

  ngOnInit() {

    // console.log(this.selectedValue) :any gives undefined
        // console.log(this.selectedValue) :'' gives empty string
    this.qzService.getQuestions().subscribe((response: any) => {

      this.getData = response[0];
      console.log(this.getData);
      this.getData1 = response;
      console.log(this.getData1);
      this.isLoaded = true;
    });
  }

  yesRadioChange(event: any) {
    this.showUplod = true;
    this.correctOption = 'Yes';
    console.log(event);
    this.selectedValue = event;
    console.log(this.selectedValue);

  }
  noRadioChange(event: any) {
    this.correctOption = 'No';
    console.log(event);
    this.selectedValue = event;
    console.log(this.selectedValue)
  }

  nextQuestion() {

    for (let i = 0; i < this.getData1.length; i++) {
      if (this.getData.qsOption1.en == this.correctOption && this.imageUrl) {
        this.imageUrl = '';
        this.showUplod = false;
        this.nquestion = this.getData.qsOption1NextQuestion;
        console.log(this.nquestion);
        this.getData = this.getData1[this.nquestion];
        this.selectedValue = '';
        console.log(this.getData);
      } else if (this.getData.qsOption2.en == this.correctOption) {
        this.nquestion = this.getData.qsOption2NextQuestion;
        console.log(this.nquestion);
        this.getData = this.getData1[this.nquestion];
        console.log(this.getData);
        this.selectedValue = '';
      }
    }
  }

  uplodFile(event: any) {

    this.showImage = true;
    const files = event.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this.handleFile.bind(this);
      reader.readAsBinaryString(file);
    }
    this.valueImage = event.target.files[0].name;
  }

  handleFile(event: any) {
    const binaryString = event.target.result;
    this.base64code = btoa(binaryString);
    this.imageUrl = 'data:image/jpeg;base64,' + this.base64code;
   }

   changeLanguage(){
       this.lang = !this.lang
   }
}
