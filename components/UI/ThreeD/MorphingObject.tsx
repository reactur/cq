import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const modelOneLink = "/models/white_quill_textured.gltf";
const modelTwoLink = "/models/cqlogo_v1.glb";

// --- helpers ---
function mergeModel(model: THREE.Object3D, scale = 1) {
  const geometries: THREE.BufferGeometry[] = [];
  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const g = mesh.geometry.clone().toNonIndexed();
      for (const a in g.attributes) {
        if (a !== "position") g.deleteAttribute(a);
      }
      g.applyMatrix4(mesh.matrixWorld);
      geometries.push(g);
    }
  });
  return mergeGeometries(geometries)!.center().scale(scale, scale, scale);
}

function pointification(mesh: THREE.Mesh, amount: number) {
  const sampler = new MeshSurfaceSampler(mesh).build();
  const pointsData: number[] = [];
  const v = new THREE.Vector3();
  for (let i = 0; i < amount; i++) {
    sampler.sample(v);
    v.toArray(pointsData, i * 3);
  }
  return new THREE.Float32BufferAttribute(pointsData, 3);
}

// --- core morphing points component ---
const MorphingPoints: React.FC = () => {
  const amount = 1500;
  const pointsRef = useRef<THREE.Points>(null);
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const t = useRef(0);

  // load models
  const gltf1 = useGLTF(modelOneLink);
  const gltf2 = useGLTF(modelTwoLink);

  const geometry = useMemo(() => {
    if (!gltf1.scene || !gltf2.scene) return null;

    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Array(amount * 3).fill(0), 3)
    );

    const model1 = new THREE.Mesh(mergeModel(gltf1.scene));
    g.setAttribute("positionStart", pointification(model1, amount));

    const model2 = new THREE.Mesh(mergeModel(gltf2.scene, 5));
    g.setAttribute("positionEnd", pointification(model2, amount));

    g.setAttribute(
      "rotDir",
      new THREE.Float32BufferAttribute(
        Array.from({ length: amount }, () => (Math.random() < 0.5 ? -1 : 1)),
        1
      )
    );

    return g;
  }, [gltf1, gltf2]);

  useFrame((_, delta) => {
    t.current += delta * 1.5;
    const ratio = Math.sin(t.current * 0.8) * 0.5 + 0.5;
    if (shaderRef.current) {
      shaderRef.current.uniforms.morphRatio.value = ratio;
    }
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry} scale={0.45}>
      <pointsMaterial
        size={0.015}
        color={0x44ffff}
        onBeforeCompile={(shader: THREE.ShaderMaterial) => {
          shader.uniforms.morphRatio = { value: 0 };
          shaderRef.current = shader;

          shader.vertexShader = `
            uniform float morphRatio;
            attribute vec3 positionStart;
            attribute vec3 positionEnd;
            attribute float rotDir;
            mat2 rot2d(float a){ return mat2(cos(a), sin(a), -sin(a), cos(a)); }
            ${shader.vertexShader}
          `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
              vec3 pStart = positionStart;
              vec3 pEnd = positionEnd;
              float distRatio = sin(morphRatio * PI);
              vec3 pos = mix(pStart, pEnd, morphRatio);
              pos.xz *= rot2d(PI2 * morphRatio);
              transformed = pos + normalize(pos) * distRatio * 0.1;
            `
          );
        }}
      />
    </points>
  );
};

// --- main scene wrapper ---
const MorphingObject: React.FC = () => {
  return <MorphingPoints />;
};

export default MorphingObject;

// drei preloading hook
useGLTF.preload(modelOneLink);
useGLTF.preload(modelTwoLink);
