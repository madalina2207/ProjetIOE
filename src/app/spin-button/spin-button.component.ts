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
  
  number: number = Math.ceil(Math.random() * 1000);

  spin() {
    const container = document.querySelector(".container") as HTMLElement;
    container.style.transform = `rotate(${this.number}deg)`;
    this.number += Math.ceil(Math.random() * 1000);
  }

}
