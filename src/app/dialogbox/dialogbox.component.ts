import { Component } from '@angular/core';
import { ApiQuizzable } from '../ApiQuizzable.service';
import { categorie } from '../categorie';
import { reponse } from '../reponse';
import { reponsescorrectes } from '../reponsescorrectes';
import { question } from '../question';
import { waitForAsync } from '@angular/core/testing';
import { ThinTexture } from '@babylonjs/core';
import { Router } from '@angular/router';

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
  player1Points =0;
  player2Points = 0;

  listeCategorie: categorie []= [];
  listeQuestions: question []= [];
  listeReponses: reponse []= [];
  listeRepCorrectes: reponsescorrectes []= [];

  texteCat !: String;
  q !: String;
  idQuest !: String;
  idRep : String []=[];
  
  

  constructor(private apiQuizz: ApiQuizzable, private router:Router) {
  }

  ngOnInit(): void{
    this.apiQuizz.getListeCat().subscribe((data: categorie[]) => {this.listeCategorie=data;});
    this.apiQuizz.getListeQuestion().subscribe((data: question[]) => {this.listeQuestions=data;});
    this.apiQuizz.getListeReponse().subscribe((data: reponse[]) => {this.listeReponses=data;});
    this.apiQuizz.getListeRepCorrecte().subscribe((data: reponsescorrectes[]) => {this.listeRepCorrectes=data;});
    this.partie();
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
      cat.style.display='block'
      quest.style.display='block'
      rep1Button.style.display = 'block'
      r1.innerHTML = rep1.toString(); 
      rep2Button.style.display = 'block'
      r2.innerHTML = rep2.toString(); 
      rep3Button.style.display = 'block'
      r3.innerHTML = rep3.toString();
      this.jeu();
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
    this.answerKey1="";
    this.answerKey2="";
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
    if(keyNb==0){
      this.answerKey1='a';
      this.answerKey2='i';
    }
    else if (keyNb==1){
      this.answerKey1='z';
      this.answerKey2='o';
    }
    else if (keyNb==2){
      this.answerKey1='e';
      this.answerKey2='p';
    }
    console.log(this.answerKey1)
    console.log(this.answerKey2)
  }

  openPopupCd() {
    const modal = document.getElementById("modal") as HTMLDivElement;
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  checkAnswer(player: number, key: string) : boolean{
    this.answerKey();
    const b1 = document.querySelector('#r1') as HTMLButtonElement;
    const b2 = document.querySelector('#r2') as HTMLButtonElement;
    const b3 = document.querySelector('#r3') as HTMLButtonElement;
    if ((key.toLowerCase() === this.answerKey1.toLowerCase()) || (key.toLowerCase() === this.answerKey2.toLowerCase())) {
      console.log(`Le joueur ${player} a trouvé la bonne réponse !`);
      if ((this.answerKey1 == 'a') || (this.answerKey2 == 'i')){
        b1.style.backgroundColor = '#328D2B';
      }
      else if ((this.answerKey1 == 'z') || (this.answerKey2 == 'o')){
        
        b2.style.backgroundColor = '#328D2B';
      }
      else if ((this.answerKey1 == 'e') || (this.answerKey2 == 'p')){
        
        b3.style.backgroundColor = '#328D2B';
      }
      setTimeout(()  =>  {
        b1.style.backgroundColor = '#6fd649';
        b2.style.backgroundColor = '#6fd649';
        b3.style.backgroundColor = '#6fd649';
      }, 3000);
      
      return true;
    }
    return false;
  }

  jeu(){
    const countdown = document.getElementById("countdown") as HTMLDivElement;
    countdown.style.display='block'
    const countDownDate = new Date().getTime() + 16000; // 15 secondes à partir de maintenant
    const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)+1;
    countdown.innerHTML = seconds + "s ";
    const jeu = (event: { key: string; }) => {
      const key = event.key.toLowerCase();
      clearInterval(x);
      if (this.player1Choices<1 && this.player1Keys.includes(key) && distance >0) {
        this.player1Choices++;
        if (this.checkAnswer(1, key)){
          clearInterval(x);
          console.log(`(J1 a gagne n points)`);
          console.log(`popup(bonne reponse j1 -> prochaine question)`);
          document.removeEventListener('keydown', jeu);
          countdown.innerHTML = ''
          this.player1Points= this.player1Points +5;
          this.questionTermine('Le J1 à gagné ce tour');
          
        }
        else{
          console.log(`Au tour du J2`);
          console.log(`le J1 ne peux plus repondre`);
          if (this.checkAnswer(2, key)){
            clearInterval(x);
            document.removeEventListener('keydown', jeu);
            countdown.innerHTML = ''
            this.player2Points= this.player2Points +5;
            this.questionTermine('Le J2 à gagné ce tour');
          } 
        }
    
      } 
      else if (this.player2Choices<1 && this.player2Keys.includes(key) && distance >0 ) {
        this.player2Choices++;
        if (this.checkAnswer(2, key)){
          clearInterval(x);
          console.log(`(J2 a gagne n points)`);
          console.log(`popup(bonne reponse j2 -> prochaine question)`);
          document.removeEventListener('keydown', jeu);
          countdown.innerHTML = ''
          this.player2Points= this.player2Points +5;
          this.questionTermine('Le J2 à gagné ce tour');
          
        }
        else{
          console.log(`Au tour du J1`);
          console.log(`le J2 ne peux plus repondre`);
          if (this.checkAnswer(1, key)){
            clearInterval(x);
            document.removeEventListener('keydown', jeu);
            countdown.innerHTML = ''
            this.player1Points= this.player1Points +5;
            this.questionTermine('Le J1 à gagné ce tour');
          }  
        }
      
      }
      else if (this.player1Choices==1 && this.player2Choices==1 && distance >0 && !this.checkAnswer(1, key) && !this.checkAnswer(2, key)){
        document.removeEventListener('keydown', jeu);
        clearInterval(x);
        countdown.innerHTML = ''
        this.questionTermine('Aucun joueurs à bien repondu, cliquer pour le prochain tours');
      }
      
    };
    document.addEventListener('keydown', jeu);
    if (distance <= 0) {
      clearInterval(x);
      countdown.innerHTML = ''
      this.questionTermine('Temps ecoulé, cliquer pour le prochain tours')
    }
    }, 1000);
    this.player1Choices=0;
    this.player2Choices=0;
    
  }

  questionTermine(phrase : string) {
    const countdown = document.getElementById("countdown") as HTMLDivElement;
    const cat = document.getElementById("monDivCat") as HTMLDivElement; 
    const quest = document.getElementById("monDivQuest") as HTMLDivElement; 
    const rep1Button = document.getElementById("r1") as HTMLButtonElement;
    const rep2Button = document.getElementById("r2") as HTMLButtonElement;
    const rep3Button = document.getElementById("r3") as HTMLButtonElement;
    const r1 = document.getElementById("r1") as HTMLDivElement; 
    const r2 = document.getElementById("r2") as HTMLDivElement; 
    const r3 = document.getElementById("r3") as HTMLDivElement;
    const modal = document.getElementById("endQuest") as HTMLDivElement;
    const nextButton = document.querySelector('#next') as HTMLButtonElement;
    const phrasePopup = document.getElementById("phrase") as HTMLDivElement;
    phrasePopup.innerHTML = phrase;
    modal.style.display = "block";
    nextButton.addEventListener('click', event => {
      if (event.target === nextButton) {
        modal.style.display = "none";
      }
    });
    nextButton.addEventListener('click', () => {
        //this.spin();
        setTimeout(()  =>  {
          countdown.style.display='none'
          cat.style.display='none'
          quest.style.display='none'
          rep1Button.style.display = 'none'
          r1.style.display = 'none'
          rep2Button.style.display = 'none'
          r2.style.display = 'none'
          rep3Button.style.display = 'none'
          r3.style.display = 'none'

        }, 500);
        
     });
    
  }
  
  partie(){
  
    const spinButton = document.querySelector('#spin') as HTMLButtonElement;
    let clickCount = 0;

    spinButton.addEventListener('click', () => {
    if (clickCount < 5) {
    // Exécuter la fonction associée au clic du bouton ici
      this.spin();
      clickCount++;
    } 
    else {
      spinButton.disabled = true; // Désactiver le bouton une fois que le nombre maximal de clics a été atteint
      if(this.player1Points>this.player2Points){
        console.log(this.player1Points , this.player2Points)
        this.partieTermine('Fin de la partie le J1 à gagne!');
      }
      else  
        console.log(this.player1Points , this.player2Points)
        this.partieTermine('Fin de la partie le J2 à gagne!');
    }
    });
    this.player1Points=0;
    this.player2Points=0;
  }

  partieTermine(phrase : string) {
    const modal = document.getElementById("endPartie") as HTMLDivElement;
    const nextButton = document.querySelector('#acc') as HTMLButtonElement;
    const phrasePopup = document.getElementById("phraseFin") as HTMLDivElement;
    phrasePopup.innerHTML = phrase;
    modal.style.display = "block";
    nextButton.addEventListener('click', () => {
        //this.spin();
        this.router.navigate(["/"]);
        
     });
    
  }
}



