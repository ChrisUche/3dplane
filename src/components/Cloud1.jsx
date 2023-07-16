/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 public/models/cloud/model.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cloud1({opacity, ...props}) {
  const { nodes, materials } = useGLTF('./models/cloud1/model.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry}> 
        <meshStandardMaterial 
            // {...materials['lambert2sg.001']} 
            envMapIntensity={2} //math the coluds more impacted by the environment colors
            transparent 
            opacity={opacity}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/cloud1/model.glb')
