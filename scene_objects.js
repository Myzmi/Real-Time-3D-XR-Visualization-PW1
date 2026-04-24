import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export function createSceneObjects(scene) { // OBJECTS
    const loader = new THREE.TextureLoader();
    const tile_texture = loader.load('materials/tiles.jpg');
    const wall_texture = loader.load('materials/wall.jpg');
    const table_texture = loader.load('materials/marble.jpg');

    //repeat tile
    tile_texture.wrapS = THREE.RepeatWrapping; 
    tile_texture.wrapT = THREE.RepeatWrapping;

    tile_texture.repeat.set( 8, 8 );

    //repeat wall
    wall_texture.wrapS = THREE.RepeatWrapping; 
    wall_texture.wrapT = THREE.RepeatWrapping;

    wall_texture.repeat.set( 2, 1 );

    //repeat marble
    table_texture.wrapS = THREE.RepeatWrapping; 
    table_texture.wrapT = THREE.RepeatWrapping;

    table_texture.repeat.set( 3, 1 );

    const color_temp = new THREE.Color(0xD2CBBF);

    //floor plane
    const floor_geometry = new THREE.PlaneGeometry( 4, 4 );
    var material = new THREE.MeshStandardMaterial( { color: color_temp, side: THREE.DoubleSide, map: tile_texture} );
    const floor_plane = new THREE.Mesh( floor_geometry, material );
    floor_plane.rotation.x = -Math.PI / 2;

    floor_plane.receiveShadow = true;
    scene.add( floor_plane );

    //back and left plane
    const wall_geometry = new THREE.PlaneGeometry( 4, 2 );
    material = new THREE.MeshStandardMaterial( { color: color_temp, side: THREE.DoubleSide, map: wall_texture} );
    const back_plane = new THREE.Mesh( wall_geometry, material );
    back_plane.position.z = -2;
    back_plane.position.y = 1;
    back_plane.receiveShadow = true;
    //back_plane.castShadow = true;
    scene.add( back_plane )

    const left_plane = new THREE.Mesh( wall_geometry, material );
    left_plane.position.x = -2;
    left_plane.position.y = 1;
    left_plane.rotation.y = Math.PI / 2;
    left_plane.receiveShadow = true;
    //left_plane.castShadow = true;
    scene.add( left_plane )

    //table
    const table_geometry = new THREE.BoxGeometry( 2, 0.6, 0.4 );
    material = new THREE.MeshStandardMaterial( { color: color_temp, map: table_texture} );
    const table_plane = new THREE.Mesh( table_geometry, material );
    //table_plane.position.x = 0;
    table_plane.position.y = 0.3;
    table_plane.position.z = -1;
    table_plane.receiveShadow = true;
    table_plane.castShadow = true;
    scene.add( table_plane )

    //cup
    const cup_cylinder = new THREE.CylinderGeometry( 0.05, 0.05, 0.1, 12, 3 );
    const material_cup = new THREE.MeshStandardMaterial( { color: 0xefff8c } );
    const cup = new THREE.Mesh( cup_cylinder, material_cup );
    cup.position.x = -0.8;
    cup.position.y = 0.65;
    cup.position.z = -1;
    cup.castShadow = true;
    scene.add( cup );

    //plate
    const plate_geometry = new THREE.CylinderGeometry( 0.1, 0.06, 0.04, 12, 1 );
    const material_plate = new THREE.MeshStandardMaterial( { color: 0x16c4ff } );
    const plate = new THREE.Mesh( plate_geometry, material_plate );
    plate.position.x = -0.6;
    plate.position.y = 0.62;
    plate.position.z = -1;
    plate.castShadow = true;
    scene.add( plate );

    //return materials
    return { material_cup, material_plate, table_plane, back_plane, left_plane, floor_plane };
}

export function createRobot(scene) { //ROBOT
    //body
    const body_bottom_geometry = new THREE.BoxGeometry( 0.4, 0.4, 0.3 );
    const robot_material = new THREE.MeshStandardMaterial( { color: 0x093084 } );
    const body_bottom = new THREE.Mesh( body_bottom_geometry, robot_material );
    body_bottom.position.y = 0.25;
    body_bottom.position.z = -1.5;
    body_bottom.castShadow = true;
    scene.add( body_bottom );

    //body top
    const body_top_geometry = new THREE.CylinderGeometry( 0.15, 0.15, 0.8, 12, 1 );
    const body_top = new THREE.Mesh( body_top_geometry, robot_material );
    body_top.position.y = 0.4;
    body_top.castShadow = true;
    body_bottom.add( body_top );

    //left wheel
    const wheel_geometry = new THREE.CylinderGeometry( 0.15, 0.15, 0.04, 12, 1 );
    const material_wheel = new THREE.MeshStandardMaterial( { color: 0x000000 } );
    const left_wheel = new THREE.Mesh( wheel_geometry, material_wheel );
    left_wheel.position.x = -0.22;
    left_wheel.position.y = -0.1;
    left_wheel.rotation.z = Math.PI / 2;
    left_wheel.castShadow = true;
    body_bottom.add( left_wheel );

    //right wheel
    const right_wheel = new THREE.Mesh( wheel_geometry, material_wheel );
    right_wheel.position.x = 0.22;
    right_wheel.position.y = -0.1;
    right_wheel.rotation.z = Math.PI / 2;
    right_wheel.castShadow = true;
    body_bottom.add( right_wheel );

    //right arm
    const shoulder_geometry = new THREE.SphereGeometry( 0.05, 8, 8 );
    const right_shoulder = new THREE.Mesh( shoulder_geometry, robot_material );
    right_shoulder.position.x = -0.18;
    right_shoulder.position.y = 0.15;
    right_shoulder.rotation.x = -Math.PI / 2;
    right_shoulder.rotation.y = -Math.PI / 4;
    right_shoulder.rotation.z = -Math.PI / 6;
    right_shoulder.castShadow = true;
    body_top.add( right_shoulder );

    const upper_arm_geometry = new THREE.BoxGeometry( 0.05, 0.25, 0.05 );
    const right_upper_arm = new THREE.Mesh( upper_arm_geometry, robot_material );
    right_upper_arm.position.y = -0.13;
    right_upper_arm.castShadow = true;
    right_shoulder.add( right_upper_arm );

    const elbow_geometry = new THREE.SphereGeometry( 0.03, 6, 6 );
    const right_elbow = new THREE.Mesh( elbow_geometry, robot_material );
    right_elbow.position.y = -0.14;
    right_elbow.rotation.z = Math.PI / 8;
    right_elbow.castShadow = true;
    right_upper_arm.add( right_elbow );

    const lower_arm_geometry = new THREE.BoxGeometry( 0.05, 0.15, 0.05 );
    const right_lower_arm = new THREE.Mesh( lower_arm_geometry, robot_material );
    right_lower_arm.position.y = -0.08;
    right_lower_arm.castShadow = true;
    right_elbow.add( right_lower_arm );

    const hand_geometry = new THREE.BoxGeometry( 0.06, 0.08, 0.02 );
    const right_hand = new THREE.Mesh( hand_geometry, robot_material );
    right_hand.position.y = -0.115;
    //left_hand.position.z = 0.1;
    right_hand.rotation.x = Math.PI / 8;
    right_hand.castShadow = true;
    right_lower_arm.add( right_hand );

    //left arm

    const left_shoulder = new THREE.Mesh( shoulder_geometry, robot_material );
    left_shoulder.position.x = 0.18;
    left_shoulder.position.y = 0.15;
    left_shoulder.rotation.x = -Math.PI / 2;
    left_shoulder.rotation.y = Math.PI / 4;
    left_shoulder.rotation.z = Math.PI / 6;
    left_shoulder.castShadow = true;
    body_top.add( left_shoulder );

    const left_upper_arm = new THREE.Mesh( upper_arm_geometry, robot_material );
    left_upper_arm.position.y = -0.13;
    left_upper_arm.castShadow = true;
    left_shoulder.add( left_upper_arm );

    const left_elbow = new THREE.Mesh( elbow_geometry, robot_material );
    left_elbow.position.y = -0.14;
    left_elbow.rotation.z = -Math.PI / 8;
    left_elbow.castShadow = true;
    left_upper_arm.add( left_elbow );

    const left_lower_arm = new THREE.Mesh( lower_arm_geometry, robot_material );
    left_lower_arm.position.y = -0.08;
    left_lower_arm.castShadow = true;
    left_elbow.add( left_lower_arm );

    const left_hand = new THREE.Mesh( hand_geometry, robot_material );
    left_hand.position.y = -0.115;
    //right_hand.position.z = 0.1;
    left_hand.rotation.x = Math.PI / 8;
    left_hand.castShadow = true;
    left_lower_arm.add( left_hand );

    //return materials and pivot points for animation
    return { robot_material, material_wheel, left_shoulder, left_elbow, left_hand, right_shoulder, right_elbow, right_hand};
}

export function createGUI(sceneAssets, robotAssets, light) { //GUI
    const gui = new GUI(); //gui
        const gui_robot = gui.addFolder('Robot'); //robot controls
        gui_robot.add( robotAssets.robot_material, 'roughness', 0, 1 );
        gui_robot.add( robotAssets.robot_material, 'metalness', 0, 1 );
        gui_robot.addColor(robotAssets.robot_material, 'color').name('Color');

        const gui_cup = gui.addFolder('Cup'); //cup controls
        gui_cup.add( sceneAssets.material_cup, 'roughness', 0, 1 );
        gui_cup.add( sceneAssets.material_cup, 'metalness', 0, 1 );
        gui_cup.addColor(sceneAssets.material_cup, 'color').name('Color');

        const gui_plate = gui.addFolder('Plate'); //plate controls
        gui_plate.add( sceneAssets.material_plate, 'roughness', 0, 1 );
        gui_plate.add( sceneAssets.material_plate, 'metalness', 0, 1 );
        gui_plate.addColor(sceneAssets.material_plate, 'color').name('Color');

        const gui_light = gui.addFolder('Light'); //light controls
        gui_light.add( light, 'intensity', 0, 20 );
        gui_light.addColor(light, 'color').name('Color');

        return gui;
}