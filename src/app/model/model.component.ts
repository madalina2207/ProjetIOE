import { Component, OnInit } from '@angular/core';
import { Scene,Engine, SceneLoader, ExecuteCodeAction } from '@babylonjs/core';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { FreeCamera } from '@babylonjs/core/Cameras';
import { KeyboardEventTypes } from '@babylonjs/core/Events/keyboardEvents';
import { HemisphericLight } from '@babylonjs/core/Lights';
import { CubeTexture, PBRMaterial, StandardMaterial, Texture } from '@babylonjs/core/Materials';
import { Color3, Vector3 } from '@babylonjs/core/Maths';
import { Mesh, MeshBuilder } from '@babylonjs/core/Meshes';
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
  octahedron !: Mesh;
  constructor() { }

 async ngOnInit(): Promise<void> {
    const canva = document.querySelector('canvas')!
    this.engine = new Engine(canva, true)
    this.scene = await this.CreateScene()
    this.CreateGroud()
    this.CreatePlayStarter(this.scene)
    //this.CreateBarrel()

    this.engine.runRenderLoop(() => {
      this.scene.render()
      this.octahedron.rotation.y += 0.01;
    })
  }

  async CreateScene() : Promise<Scene>{
    this.engine.enableOfflineSupport = false
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0,0.75,-2), this.scene)
    camera.attachControl()
    camera.speed = 0.25

    const envTex = CubeTexture.CreateFromPrefilteredData("../../assets/env/sky.env",scene)
    scene.environmentTexture = envTex
    scene.createDefaultSkybox(envTex, true)
    scene.environmentIntensity = 1
    const s = this.CreateCommbatant(scene)
    const s2 = this.CreateCommbatant2(scene)
    //const o = this.CreatePlayStarter(scene)
    let sc = await s;
    sc = await s2;
    //sc= await s2;
    return sc
  }

  CreatePlayStarter(scene : Scene) : Scene{
    //let octahedron: Mesh;
    
    this.octahedron = MeshBuilder.CreatePolyhedron(
      'octahedron',
      { type: 1, size: 0.14},
      this.scene
    );
    this.octahedron.setPositionWithLocalVector(new Vector3(1.0, 0.2, 1.0));
    
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


async CreateCommbatant(scene :Scene){
  const {meshes,animationGroups,skeletons} = await SceneLoader.ImportMeshAsync('','../../assets/models/','combattant5.glb',scene)
  console.log("meshes",meshes)
  console.log(animationGroups)
  console.log(skeletons)
  animationGroups[0].stop()
  const hero = meshes[0]
  hero.scaling.scaleInPlace(0.5)
  

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
      hero.moveWithCollisions(hero.forward.scaleInPlace(speed))
      keydown = true
    }

    if(inputMap["s"]){
      hero.moveWithCollisions(hero.forward.scaleInPlace(-speed))
      keydown = true
    }

    if(inputMap["a"]){
      hero.rotate(Vector3.Up(),-0.1)
      keydown = true
    }

    if(inputMap["d"]){
      hero.rotate(Vector3.Up(),0.1)
      keydown = true
    }
    if(inputMap["f"]){
      doubleAttack?.start(false,1.0,doubleAttack?.from,doubleAttack.to,false)
    }


    if(keydown){
      console.log("xxxxxxxxxxxxxxxxxxxx")
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

async CreateCommbatant2(scene :Scene){
  const {meshes,animationGroups,skeletons} = await SceneLoader.ImportMeshAsync('','../../assets/models/','combattant5.glb',scene)
  console.log("meshes",meshes)
  console.log(animationGroups)
  console.log(skeletons)
  animationGroups[0].stop()
  const hero2 = meshes[0]
  hero2.scaling.scaleInPlace(0.5)
  

  const skeleton = skeletons[0]
  const speed = 0.03

  const walk =   scene.getAnimationGroupByName("walk")
  const doubleAttack2 = scene.getAnimationGroupByName("doubleAttack")
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
    if(inputMap["w"]){
      hero2.moveWithCollisions(hero2.forward.scaleInPlace(speed))
      keydown = true
    }

    if(inputMap["x"]){
      hero2.moveWithCollisions(hero2.forward.scaleInPlace(-speed))
      keydown = true
    }

    if(inputMap["c"]){
      hero2.rotate(Vector3.Up(),-0.1)
      keydown = true
    }

    if(inputMap["v"]){
      hero2.rotate(Vector3.Up(),0.1)
      keydown = true
    }
    if(inputMap["b"]){
      doubleAttack2?.start(false,1.0,doubleAttack2?.from,doubleAttack2.to,false)
    }


    if(keydown){
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      if(!this.animating){
          this.animating = true
          if(inputMap["w"]){
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
        doubleAttack2?.stop()
        attackSimple?.stop()
        this.animating = false
      }
    }
    

  })

  return scene;
}

}
