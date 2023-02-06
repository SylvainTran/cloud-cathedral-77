import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../core/post';
import * as THREE from 'three';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  post: Post | undefined;

  threejsKey: string = "";

  public parseThreejs() {
    console.log("Parsing threejs...");

    // If there is a threejs key, fetch the scene data here
    if (this.post?.threejsSceneKey) {
      // Create the scene... using the scene id's config
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      let canvasById = document.getElementById(this.post.threejsSceneKey);

      if (canvasById) {

        const renderer = new THREE.WebGLRenderer({canvas: canvasById});
        renderer.setSize(600, 300);
  
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
  
        camera.position.z = 5;
  
        const animate = function () {
          requestAnimationFrame(animate);
  
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
  
          renderer.render(scene, camera);
        };
  
        // Controls
        // let orbitControls = new OrbitControls(camera);
  
        animate();
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterViewInit(): void {
    this.parseThreejs();
  }
}
