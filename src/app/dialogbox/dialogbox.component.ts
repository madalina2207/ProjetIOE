import { Component } from '@angular/core';
import { ApiQuizzable } from '../ApiQuizzable.service';
import { categorie } from '../categorie';
import { reponse } from '../reponse';
import { reponsescorrectes } from '../reponsescorrectes';
import { question } from '../question';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

  answerKey1 !: String;
  answerKey2 !: String;
  player1Keys = ['a', 'z', 'e']; // Touches pour joueur 1
  player2Keys = ['i', 'o', 'p']; // Touches pour joueur 2
  player1Choices = 0; // Nombre de choix pour joueur 1
  player2Choices = 0; // Nombre de choix pour joueur 2
  number: number = 0;

  listeCategorie: categorie []= [];
  listeQuestions: question []= [];
  listeReponses: reponse []= [];
  listeRepCorrectes: reponsescorrectes []= [];

  texteCat !: String;
  q !: String;
  idQuest !: String;
  idRep : String []=[];


  constructor(private apiQuizz: ApiQuizzable) {
    // Ecouter les touches pressées par les joueurs
    document.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      if (this.player1Choices<1 && this.player1Keys.includes(key)) {
        this.player1Choices++;
        console.log(`avant check 1`);
        this.checkAnswer(1, key);
        console.log(`apres check 1`);
      } else if (this.player2Choices<1 && this.player2Keys.includes(key)) {
        this.player2Choices++;
        console.log(`avant check 2`);
        this.checkAnswer(2, key);
        console.log(`apres check 2`);
      }
    });
  
  }

  ngOnInit(): void{
    this.apiQuizz.getListeCat().subscribe((data: categorie[]) => {this.listeCategorie=data;});
    this.apiQuizz.getListeQuestion().subscribe((data: question[]) => {this.listeQuestions=data;});
    this.apiQuizz.getListeReponse().subscribe((data: reponse[]) => {this.listeReponses=data;});
    this.apiQuizz.getListeRepCorrecte().subscribe((data: reponsescorrectes[]) => {this.listeRepCorrectes=data;});
  }

  

  spin() {
    this.number += 100 + Math.ceil(Math.random() * 1000);
    const container = document.querySelector(".container") as HTMLElement;
    container.style.transform = `rotate(${this.number}deg)`;
    console.log('number=',this.number);
    let deg = this.number%360;
    console.log('deg=',deg);

    if (deg >= 0 && deg <= 45) {
      console.log("Air");
      this.texteCat="Air";
    } else if (deg > 45 && deg <= 90) {
      console.log("Cat. nat");
      this.texteCat="Catastrophes naturelles";
    } else if (deg > 90 && deg <= 135) {
      console.log("Res. nat")
      this.texteCat="Ressources naturelles";
    } else if (deg > 135 && deg <= 180) {
      console.log("Eau");
      this.texteCat="Eau";
    } else if (deg > 180 && deg <= 225) {
      console.log("Pollution");
      this.texteCat="Pollution";
    } else if (deg > 225 && deg <= 270) {
      console.log("Biologie");
      this.texteCat="Biologie";
    } else if (deg > 270 && deg <= 315) {
      console.log("Dechets");
      this.texteCat="Dechets";
    } else if ((deg > 315 && deg < 360)||(deg=0)) {
      console.log("Climat");
      this.texteCat="Climat";
    }
    
    this.q = this.selectionQuestion();
    let reponses : String [] = [];
    let rep1 !: String;
    let rep2 !: String;
    let rep3 !: String;
    reponses= this.recupererReponses();
    rep1=reponses[0];
    rep2=reponses[1];
    rep3=reponses[2];

    const cat = document.getElementById("monDivCat") as HTMLDivElement; 
    const quest = document.getElementById("monDivQuest") as HTMLDivElement; 
    const rep1Button = document.getElementById("r1") as HTMLButtonElement;
    const rep2Button = document.getElementById("r2") as HTMLButtonElement;
    const rep3Button = document.getElementById("r3") as HTMLButtonElement;
    const r1 = document.getElementById("r1") as HTMLDivElement; 
    const r2 = document.getElementById("r2") as HTMLDivElement; 
    const r3 = document.getElementById("r3") as HTMLDivElement;

   

    setTimeout(() => { 
      cat.innerHTML = this.texteCat.toString();
      quest.innerHTML = this.q.toString(); 
      rep1Button.style.display = 'block'
      r1.innerHTML = rep1.toString(); 
      rep2Button.style.display = 'block'
      r2.innerHTML = rep2.toString(); 
      rep3Button.style.display = 'block'
      r3.innerHTML = rep3.toString(); 
    }, 5000);
  }

  selectionQuestion(): String {
    let i=0;
    let nb;

    while(true){
      if (this.listeCategorie[i].nomCat=== this.texteCat){
        nb=Math.ceil(Math.random() * 25);
        //console.log(this.listeCategorie[i].questions[nb].question)
        this.idQuest= this.listeCategorie[i].questions[nb].idQ;
        return this.listeCategorie[i].questions[nb].question;
      }
      i=i+1;
    }     
  }

  recupererReponses() : String[] {
    let i=0;
    const Rep : String [] = [];
    this.idRep=[];
    while(i<this.listeReponses.length){
      if (this.listeReponses[i].question.idQ === this.idQuest){
        this.idRep.push(this.listeReponses[i].idR)
        Rep.push(this.listeReponses[i].rep)
      }
      i=i+1;
    }
    console.log(Rep);
    console.log(this.idRep);
    return Rep;
  }

  answerKey(){
    let i=0;
    let keyNb;
    while(i<this.listeRepCorrectes.length){
      for(let j=0;j <this.idRep.length; j++){
        if(this.idRep[j]===this.listeRepCorrectes[i].reponse.idR){
          keyNb=j;
          console.log(this.listeRepCorrectes[i].idRC)
        }
      }
      i=i+1;
    }

    console.log(keyNb)
    if(keyNb=0){
      this.answerKey1='a';
      this.answerKey2='i';
    }
    else if (keyNb=1){
      this.answerKey1='z';
      this.answerKey2='o';
    }
    else if (keyNb=2){
      this.answerKey1='e';
      this.answerKey2='p';
    }
  }

  

  
  checkAnswer(player: number, key: string) {
    this.answerKey();
    if ((key.toLowerCase() === this.answerKey1.toLowerCase()) || (key.toLowerCase() === this.answerKey2.toLowerCase())) {
      console.log(`Le joueur ${player} a trouvé la bonne réponse !`);
      console.log(`reinitialisation`);
    }
    if (this.player1Choices > 0 && this.player2Choices > 0) {
      // Both players have made a choice, check who answered first
      if (this.player1Keys.indexOf(key) < this.player2Keys.indexOf(key)) {
        console.log(`Le joueur 1 a répondu en premier !`);
      } else if (this.player2Keys.indexOf(key) < this.player1Keys.indexOf(key)) {
        console.log(`Le joueur 2 a répondu en premier !`);

      }
    }
  }

}
