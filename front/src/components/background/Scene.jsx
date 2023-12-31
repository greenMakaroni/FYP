/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, MeshReflectorMaterial } from '@react-three/drei'
import sceneUrl from "./scene.glb"

export default function Scene(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(sceneUrl)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    for (const [key, value] of Object.entries(actions)) {
      actions[`${key}`].play()
    }
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mixBlur={4}
          mixStrength={20}
          depthScale={2}
          minDepthThreshold={0.85}
          color="#151515"
          metalness={0.2}
          roughness={0.6}
        />
        </mesh>
      <group name="Scene">
        <mesh 
          name="upCone1" 
          geometry={nodes.upCone1.geometry} 
          material={materials.ether3} 
          position={[0, 4.16, 0.04]} 
          rotation={[0, 1, 0]} 
          scale={0.62} />
        <mesh 
          name="downCone1" 
          geometry={nodes.downCone1.geometry} 
          material={materials.ether3} 
          position={[0, 2.81, 0.04]} 
          rotation={[0, 1, Math.PI]} 
          scale={0.62} />
        <mesh 
          name="upCone_face1" 
          geometry={nodes.upCone_face1.geometry} 
          material={materials.white} 
          position={[0, 4.16, 0.04]} 
          rotation={[0, 1, 0]} 
          scale={0.62} />
        <mesh 
          name="downCone_face1" 
          geometry={nodes.downCone_face1.geometry} 
          material={materials.glow} 
          position={[0, 2.81, 0.04]} 
          rotation={[0, 1, Math.PI]} 
          scale={0.62} />
      </group>
    </group>
  )
}

useGLTF.preload('./src/components/scene.glb')
