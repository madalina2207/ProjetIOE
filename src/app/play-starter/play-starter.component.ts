import { Color3, CubeTexture, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PBRMaterial, PolyhedronBuilder, Scene, StandardMaterial, Texture, Vector3 } from '@babylonjs/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-play-starter',
  templateUrl: './play-starter.component.html',
  styleUrls: ['./play-starter.component.css']
})
export class PlayStarterComponent implements OnInit {

  scene !: Scene;
  engine!: Engine
  octahedron!: Mesh;

  constructor() { }

  ngOnInit(): void {
    const canva = document.querySelector('canvas')
    this.engine = new Engine(canva, true)
    this.scene  = this.CreateScene()

    this.engine.runRenderLoop(() =>{
      this.octahedron.rotation.y += 0.01;
      this.scene.render()
    })
  }

  CreateScene() : Scene{
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0,1,-5), this.scene)
    camera.attachControl()
    
    this.octahedron = MeshBuilder.CreatePolyhedron(
      'octahedron',
      { type: 1, size: 1},
      this.scene
    );

    let material = new PBRMaterial("material", scene);
    //material.albedoColor = new Color3(0.5, 1, 0.5); // red color
    material.metallic = 0.8; // partially reflective
    material.roughness = 0.5; // partially shiny

    var redMat = new StandardMaterial("material", scene);
	  redMat.diffuseTexture = new Texture("assets/textures/painted_concrete_diff_4k.jpg", this.scene);
    this.octahedron.material = redMat;

    let light = new HemisphericLight("light", new Vector3(0, 1, -1), this.scene);
	  light.specular = new Color3(0, 0.5, 0);
	
    return scene
  }

}
