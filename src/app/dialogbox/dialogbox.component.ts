import * as BABYLON from 'babylonjs';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Scene,Engine } from 'babylonjs';
//import { Engine } from '@babylonjs/core';
//import { BabylonjsComponent } from 'angular-babylonjs';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  scene!:Scene
  engine!:Engine
  constructor() { }
  //@ViewChild('babylonjs') babylonjsCanvas: ElementRef<BabylonjsComponent>;
  
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    /*const babylonjs = this.babylonjsCanvas.nativeElement;
    const canvas = babylonjs.canvas;
    const engine = babylonjs.engine;*/

    const canvas = document.querySelector('canvas')!
    this.engine = new BABYLON.Engine(canvas, true)
 
  
    const scene = new Scene(this.engine);
    
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
  
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
    box.position.y = 1;
  
    const textTexture = new BABYLON.DynamicTexture("text", {width:512, height:256}, scene);
    const textMaterial = new BABYLON.StandardMaterial("textMaterial", scene);
    textMaterial.diffuseTexture = textTexture;
  
    const text = "Hello, World!";
    textTexture.drawText(text, null, 150, "bold 100px Arial", "white", "transparent");
  
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 2}, scene);
    plane.position.y = 0.5;
    plane.material = textMaterial;
  }
  

}
