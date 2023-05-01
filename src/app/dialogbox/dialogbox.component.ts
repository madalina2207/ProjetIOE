import { Component } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

  answerKey1 = 'a';
  answerKey2 = 'i'; // Réponse à deviner
  player1Keys = ['a', 'z', 'e']; // Touches pour joueur 1
  player2Keys = ['i', 'o', 'p']; // Touches pour joueur 2
  player1Choices = 0; // Nombre de choix pour joueur 1
  player2Choices = 0; // Nombre de choix pour joueur 2

  constructor() {
    // Ecouter les touches pressées par les joueurs
    document.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      if (this.player1Keys.includes(key)) {
        this.player1Choices++;
        this.checkAnswer(1, key);
      } else if (this.player2Keys.includes(key)) {
        this.player2Choices++;
        this.checkAnswer(2, key);
      }
    });
  }

  checkAnswer(player: number, key: string) {
    if ((key.toLowerCase() === this.answerKey1.toLowerCase()) || (key.toLowerCase() === this.answerKey2.toLowerCase())) {
      console.log(`Le joueur ${player} a trouvé la bonne réponse !`);
      // Réinitialiser les choix des deux joueurs
      this.player1Choices = 0;
      this.player2Choices = 0;
    }
    if (this.player1Choices > 0 && this.player2Choices > 0) {
      // Both players have made a choice, check who answered first
      if (this.player1Keys.indexOf(key) < this.player2Keys.indexOf(key)) {
        console.log(`Le joueur 1 a répondu en premier !`);
        // Réinitialiser les choix des deux joueurs
        this.player1Choices = 0;
        this.player2Choices = 0;
      } else if (this.player2Keys.indexOf(key) < this.player1Keys.indexOf(key)) {
        console.log(`Le joueur 2 a répondu en premier !`);
        // Réinitialiser les choix des deux joueurs
        this.player1Choices = 0;
        this.player2Choices = 0;
      }
    }
  }

}
