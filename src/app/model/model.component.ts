import { Component, OnInit } from '@angular/core';
import { Scene,Engine, SceneLoader, ExecuteCodeAction } from '@babylonjs/core';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { FreeCamera } from '@babylonjs/core/Cameras';
import { KeyboardEventTypes } from '@babylonjs/core/Events/keyboardEvents';
import { HemisphericLight } from '@babylonjs/core/Lights';
import { CubeTexture, PBRMaterial, Texture } from '@babylonjs/core/Materials';
import { Vector3 } from '@babylonjs/core/Maths';
import { MeshBuilder } from '@babylonjs/core/Meshes';
import "@babylonjs/loaders/glTF";


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  scene!:Scene
  engine!:Engine
  animating = true
  constructor() { }

 async ngOnInit(): Promise<void> {
    const canva = document.querySelector('canvas')!
    this.engine = new Engine(canva, true)
    this.scene = await this.CreateScene()
    // this.CreateGroud()
    this.CreateVillage()
    //this.CreateBarrel()
   // this.CreateCommbatant()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  async CreateScene() : Promise<Scene>{
    this.engine.enableOfflineSupport = false
    const scene = new Scene(this.engine)
    //gauche, hateur, rapproche
    const camera = new FreeCamera("camera", new Vector3(80,20,-20), this.scene)
    camera.attachControl()
    camera.speed = 0.5

    const envTex = CubeTexture.CreateFromPrefilteredData("../../assets/env/sky.env",scene)
    scene.environmentTexture = envTex
    // scene.createDefaultSkybox(envTex, true)
    scene.environmentIntensity = 1
    const s = this.CreateCommbatant(scene)
    const sc = await s
    return sc
  }

 CreateGroud(){


    const groud = MeshBuilder.CreateGround("groud",{width:100, height:10}, this.scene)
    groud.material  =this.CreateAsphalt()
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

 async CreateBarrel(){
  const {meshes} = await SceneLoader.ImportMeshAsync('','../../assets/models/','Barrel.glb')
  console.log("meshes",meshes)
}

async CreateVillage(){
  // Création des bâtiments
  const {meshes} = await SceneLoader.ImportMeshAsync('','../../assets/models/','batiment.glb')
  // Changement de la dimension du cube en multipliant sa taille par un facteur de mise à l'échelle
  //1er objet
  const batiment1 = meshes[0]
  batiment1.position = new Vector3(9.2,7,55)
  batiment1.scaling = new Vector3(0.5,0.5,0.5) //dimension de l'objet
  batiment1.addRotation(0,59.7,0)
  //2eme objet
  const batiment2=batiment1.clone("batiment2",null,);
  if(batiment2 != null)
  {
    batiment2.position = new Vector3(98,7,55);
    // batiment2.scaling = new Vector3(1,1,1)
    // batiment2.addRotation(0,0,0);
  }
  // 3eme objet
  const batiment3=batiment1.clone("batiment3",null,);
  if(batiment3 != null)
  {
    batiment3.position = new Vector3(53.5,7,55);
    // batiment3.scaling = new Vector3(1,1,1)
    // batiment3.addRotation(0,-0.8,0);
  }
  console.log("meshes",meshes);
}

async CreateCommbatant(scene :Scene){
  const {meshes,animationGroups,skeletons} = await SceneLoader.ImportMeshAsync('','../../assets/models/','combattant5.glb',scene)
  console.log("meshes",meshes)
  console.log(animationGroups)
  console.log(skeletons)
  animationGroups[0].stop()
  const hero1 = meshes[0]
  hero1.position = new Vector3(75,15,30)
  hero1.addRotation(0,22,0)
  // hero.scaling.scaleInPlace(0.5)

  const skeleton = skeletons[0]
  const speed = 0.03

  const walk =   scene.getAnimationGroupByName("walk")
  const doubleAttack = scene.getAnimationGroupByName("doubleAttack")
  const attackSimple = scene.getAnimationGroupByName('Armature|mixamo.com|Layer0')
  const walking = scene.getAnimationGroupByName("walking")

  const inputMap:any = {}
  scene.actionManager = new ActionManager(scene)
  scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type =="keydown"
  }))
  scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,function(evt){
    inputMap[evt.sourceEvent.key] =  evt.sourceEvent.type =="keydown"
  }))



  scene.onBeforeRenderObservable.add(() => {
    var keydown = false
    if(inputMap["z"]){
      hero1.moveWithCollisions(hero1.forward.scaleInPlace(speed))
      keydown = true
    }

    if(inputMap["s"]){
      hero1.moveWithCollisions(hero1.forward.scaleInPlace(-speed))
      keydown = true
    }

    if(inputMap["a"]){
      hero1.rotate(Vector3.Up(),-0.1)
      keydown = true
    }

    if(inputMap["d"]){
      hero1.rotate(Vector3.Up(),0.1)
      keydown = true
    }
    if(inputMap["f"]){
      doubleAttack?.start(false,1.0,doubleAttack?.from,doubleAttack.to,false)
    }



    if(keydown){
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      if(!this.animating){
          this.animating = true
          if(inputMap["z"]){
            walking?.start(true,1.0,walking.from,walking.to,false)
          }

      }
    }
    else{
      if(this.animating){
        const defaultAnim = animationGroups[5]
        defaultAnim.start(true,1.0,defaultAnim.from, defaultAnim.to,false)
        walk?.stop()
        walking?.stop()
        doubleAttack?.stop()
        attackSimple?.stop()
        this.animating = false
      }
    }

  })

  return scene;
}
}
