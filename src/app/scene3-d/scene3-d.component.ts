import { Component, OnInit } from '@angular/core';
import { Scene,Engine } from '@babylonjs/core';
import { FreeCamera } from '@babylonjs/core/Cameras';
import { HemisphericLight } from '@babylonjs/core/Lights';
import { CubeTexture, PBRMaterial, Texture } from '@babylonjs/core/Materials';
import { Vector3 } from '@babylonjs/core/Maths';
import { MeshBuilder } from '@babylonjs/core/Meshes';

@Component({
  selector: 'app-scene3-d',
  templateUrl: './scene3-d.component.html',
  styleUrls: ['./scene3-d.component.css']
})
export class Scene3DComponent implements OnInit {

  scene !: Scene;
  engine!: Engine

  constructor() { }

  ngOnInit(): void {
    const canva = document.querySelector('canvas')
    this.engine = new Engine(canva, true)
    this.scene  = this.CreateScene()

    this.engine.runRenderLoop(() =>{
      this.scene.render()
    })
  }

  CreateScene() : Scene{
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0,1,-5), this.scene)
    camera.attachControl()

    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene)
    hemiLight.intensity = 0

    const envTex = CubeTexture.CreateFromPrefilteredData("../../assets/env/sky.env", scene)
    scene.environmentTexture = envTex
    scene.createDefaultSkybox(envTex, true)
    scene.environmentIntensity = 1

    const ground = MeshBuilder.CreateGround('ground', {width:10, height:10},this.scene)
    const ball   = MeshBuilder.CreateSphere('sphere',{diameter:1},this.scene)
    ball.position = new Vector3(0,1,0)


    ground.material = this.CreateAsphalt()
    ball.material = this.CreateMagic()

    return scene
  }

  CreateAsphalt() : PBRMaterial{
    const pbr = new PBRMaterial("pbr", this.scene)
    pbr.albedoTexture = new Texture("../../assets/textures/asphalt_diffuse.jpg",this.scene)
    pbr.bumpTexture = new Texture("../../assets/textures/asphalt_normal.jpg",this.scene)
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true
    pbr.roughness = 1

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen =  true
    pbr.useMetallnessFromMetallicTextureBlue  = true

    pbr.metallicTexture = new Texture("../../assets/textures/asphalt_ao_rough_metal.jpg",this.scene)
    return pbr;
  }

  CreateMagic() : PBRMaterial{
    const pbr = new PBRMaterial("pbr",this.scene)
    pbr.environmentIntensity =1
    return pbr
  }

}
