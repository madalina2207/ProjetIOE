import { Component } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

  answerKey1 = 'e';
  answerKey2 = 'p'; // Réponse à deviner
  player1Keys = ['a', 'z', 'e']; // Touches pour joueur 1
  player2Keys = ['i', 'o', 'p']; // Touches pour joueur 2
  player1Choices = 0; // Nombre de choix pour joueur 1
  player2Choices = 0; // Nombre de choix pour joueur 2
  number: number = 0;

  constructor() {
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

  spin() {
    this.number += 100 + Math.ceil(Math.random() * 1000);
    const container = document.querySelector(".container") as HTMLElement;
    container.style.transform = `rotate(${this.number}deg)`;
    console.log('number=',this.number);
    let deg = this.number%360;
    console.log('deg=',deg);

    if (deg >= 0 && deg <= 45) {
      console.log("Air");
    } else if (deg > 45 && deg <= 90) {
      console.log("Cat. nat");
    } else if (deg > 90 && deg <= 135) {
      console.log("Res. nat");
    } else if (deg > 135 && deg <= 180) {
      console.log("Eau");
    } else if (deg > 180 && deg <= 225) {
      console.log("Pollution");
    } else if (deg > 225 && deg <= 270) {
      console.log("Biologie");
    } else if (deg > 270 && deg <= 315) {
      console.log("Dechets");
    } else if ((deg > 315 && deg < 360)||(deg=0)) {
      console.log("Climat");
    }
  }

  checkAnswer(player: number, key: string) {
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
