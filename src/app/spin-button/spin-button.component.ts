import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.css']
})
export class SpinButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  number: number = 0;

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
}
