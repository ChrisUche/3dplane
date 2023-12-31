import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Group, Euler, Quaternion, Vector3 } from "three";
import * as THREE from "three";

import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { TextSection } from "./TextSection";
import { gsap } from "gsap";
import { Cloud2 } from "./Cloud2";
import { Cloud1 } from "./Cloud1";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { usePlay } from "../contexts/Play";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, [curvePoints]);

  const textSections = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 3,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        title: "Welcome",
        subtitle: `Buckle up as I take you on my Journey as a Frontend Developer.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y + 3,
          curvePoints[2].z
        ),
        title: "HomeChow.ca (Frontend Developer Intern)",
        subtitle: `• Worked closely with a cross-functional team to design and implement new features, ensuring alignment with project objectives.
        • Handled Production of various web pages
        • Diagnosed and resolved issues, optimizing application performance and enhancing user experiences.
        • Leveraged React,typescript,Next js for web development, creating user-friendly and responsive web interfaces.
        • Responsible for testing the application using e2e tool, i.e., cypress.
        • Actively participated in Agile methodologies, such as daily stand-up meetings, sprint planning, and retrospectives.
        • Utilizing Git`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: "Fear of flying?",
        subtitle: `Our flight attendants will help you, have a great journey`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y + 2.3,
          curvePoints[4].z - 10
        ),
        title: "SubShare(Junior frontend developer)",
        subtitle:`
        • Collaborated with an amazing team to develop user-friendly web app.
        • Experienced in React Native, React, and Next.js. Contributed to cross-platform mobile app development, optimized web applications for performance, and improved UI/UX.
        • Implemented Redux for streamlined data flow and consistent app performance..
        • Diagnosed and resolved issues, optimizing application performance and enhancing user experiences..
        • Creating reusable components that result in faster development times.
        ` ,
      },
    ],
    [curvePoints]
  );

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);


  const clouds = useMemo(() => [
     // STARTING
     {
      position: new Vector3(-3.5, -3.2, -7),
    },
    {
      position: new Vector3(3.5, -4, -10),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(-18, 0.2, -68),
      rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
    },
    {
      scale: new Vector3(2.5, 2.5, 2.5),
      position: new Vector3(10, -1.2, -52),
    },
    // FIRST POINT
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[1].x + 10,
        curvePoints[1].y - 4,
        curvePoints[1].z + 64
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[1].x - 20,
        curvePoints[1].y + 4,
        curvePoints[1].z + 28
      ),
      rotation: new Euler(0, Math.PI / 7, 0),
    },
    {
      rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x - 13,
        curvePoints[1].y + 4,
        curvePoints[1].z - 62
      ),
    },
    {
      rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 54,
        curvePoints[1].y + 2,
        curvePoints[1].z - 82
      ),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 8,
        curvePoints[1].y - 14,
        curvePoints[1].z - 22
      ),
    },
    // SECOND POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[2].x + 6,
        curvePoints[2].y - 7,
        curvePoints[2].z + 50
      ),
    },
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[2].x - 2,
        curvePoints[2].y + 4,
        curvePoints[2].z - 26
      ),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[2].x + 12,
        curvePoints[2].y + 1,
        curvePoints[2].z - 86
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
    },
    // THIRD POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x + 3,
        curvePoints[3].y - 10,
        curvePoints[3].z + 50
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x - 10,
        curvePoints[3].y,
        curvePoints[3].z + 30
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[3].x - 20,
        curvePoints[3].y - 5,
        curvePoints[3].z - 8
      ),
      rotation: new Euler(Math.PI, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[3].x + 0,
        curvePoints[3].y - 5,
        curvePoints[3].z - 98
      ),
      rotation: new Euler(0, Math.PI / 3, 0),
    },
    // FOURTH POINT
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[4].x + 3,
        curvePoints[4].y - 10,
        curvePoints[4].z + 2
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[4].x + 24,
        curvePoints[4].y - 6,
        curvePoints[4].z - 42
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[4].x - 4,
        curvePoints[4].y + 9,
        curvePoints[4].z - 62
      ),
      rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
    },
    // FINAL
    // {
    //   scale: new Vector3(3, 3, 3),
    //   position: new Vector3(
    //     curvePoints[7].x + 12,
    //     curvePoints[7].y - 5,
    //     curvePoints[7].z + 60
    //   ),
    //   rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
    // },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[7].x - 12,
        curvePoints[7].y + 5,
        curvePoints[7].z + 120
      ),
      rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[7].x,
        curvePoints[7].y,
        curvePoints[7].z
      ),
      rotation: new Euler(0, 0, 0),
    },
  ], [])

  // shape for line/curve size
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);
    return shape;
  }, []);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const scroll = useScroll();
  const {play, end, setEnd, } = usePlay();
  const camera = useRef()
  

    // {/* scroll and rotation algorithm*/}
  useFrame((_state, delta) => {


    if (window.innerWidth > window.innerHeight) {
      //landscape
      camera.current.fov =30;
      camera.current.position.z = 5;
    } else {
      //portrait
      camera.current.fov =80;
      camera.current.position.z = 2;

    }


    // fade in cloud and curve
    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current, 1, delta * 0.1
      );
    };

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current, 0, delta
      );
    };

    if (end) {
      return;
    }


    let resetCameraRail = true;
    let friction = 1;

        // Look to close text sections
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;

        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
      }
    });

    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    const scrollOffset = Math.max(0, scroll.offset);
    tl.current.seek(scrollOffset * tl.current.duration()) //on scroll gradient changes

    const curPoint = curve.getPoint(scrollOffset);

        // follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24 * friction);

        // Make the group look ahead on the curve
    const lookAtPoint = curve.getPoint(
      Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
    );
    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

        // Airplane rotation
    const tangent = curve.getTangent(
      scrollOffset + CURVE_AHEAD_AIRPLANE
    );

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(
      nonLerpLookAt.position.clone().add(targetLookAt)
    );

    tangent.applyAxisAngle(new THREE.Vector3(0, 1, 0), -nonLerpLookAt.rotation.y);

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4;      angleDegrees *= 2.4;  // stronger angle

        // LIMIT Plane Angle
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }

    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

        // Set Back Angle
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new Quaternion().setFromEuler(
      new Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    if (cameraGroup.current.position.z < curvePoints[curvePoints.length - 1].z + 100 )
      {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const airplane = useRef();

  const tl = useRef(); //to store our timeline
  const backgroundColors = useRef({//to store background colors
    colorA: "#357ca1",
    colorB: "#ffad30",
  });

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#09B1EC",
      colorB: "white",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#357ca1",
      colorB: "white",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#357ca1",
      colorB: "#ffcc00",
    });

    tl.current.pause();

    //fade in plane
    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -4,
    })

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });


  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play(); 
    }
  }, )

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={0.1} />
       {/* <OrbitControls /> */}
      <group ref={cameraGroup}>
        <Background  backgroundColors={backgroundColors} />
        <group ref={cameraRail}>
          <PerspectiveCamera ref={camera} position={[0, 0, 5]} fov={30} makeDefault />
        </group>
         {/* wrap in a 'float' to create a flying sensation */}
        <group ref={airplane}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>
            {/* Text */}
      {textSections.map((textSection, index) => (
        <TextSection {...textSection} key={index} />
      ))}
       {/* Line */}
      <group position-y={-2}>
        {/* <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={16}
        /> */}
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial 
            color={"white"} 
            ref={lineMaterialRef}
            transparent 
            envMapIntensity={2}
            onBeforeCompile={fadeOnBeforeCompile} // the shader apper only when close effect
            />
        </mesh>
      </group>

      {/* clouds */}
      {
        clouds.map((cloud, index) => (
          // sceneOpacity makes the clouds invinsible till "explore" is clicked
          <Cloud2 sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))
      }
      <Cloud sceneOpacity={sceneOpacity} opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -30]} />
      <Cloud2 sceneOpacity={sceneOpacity} opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, -20]} />
      <Cloud2 sceneOpacity={sceneOpacity} scale={[1, 1, 1.5]} position={[-3.5, -1.2, -7]} />
      <Cloud2 sceneOpacity={sceneOpacity} scale={[1, 1, 2]} position={[3.5, -1, -10]} rotation-y={Math.PI} />
      <Cloud2
        sceneOpacity={sceneOpacity}
        scale={[1, 1, 1]}
        rotation-y={Math.PI / 3}
        position={[-3.5, -0.2, -12]}
      />
      <Cloud sceneOpacity={sceneOpacity} scale={[1, 1, 1]} position={[3.5, -0.2, -12]} />
      <Cloud
        sceneOpacity={sceneOpacity}
        opacity={0.7}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[1, -0.2, -12]}
      />
      <Cloud sceneOpacity={sceneOpacity} opacity={0.3} scale={[0.8, 0.8, 0.8]} position={[0, 1, -100]} />

      <Cloud1 sceneOpacity={sceneOpacity} opacity={0.3} scale={[3.8, 3.8, 3.8]} position={[10, 5, -50]}/>
      <Cloud1 sceneOpacity={sceneOpacity} opacity={0.3} scale={[3.8, 3.8, 3.8]} position={[5, 15, -300]}/>
      <Cloud1 sceneOpacity={sceneOpacity} opacity={0.3} scale={[3.8, 3.8, 3.8]} position={[20, 2, -380]}/>
      <Cloud1 sceneOpacity={sceneOpacity} opacity={0.3} scale={[3.8, 3.8, 3.8]} position={[70, 10, -430]}/>
      
    </>
  );
};


// `• Extensive use of source control and version control tools like GitHub
//         • Extensive Use of Languages typescript, Javascript 
//         • Utilising Next js ,React-Native React as a Front-end technology
//         • We used Redux as a state management tool when developing the mobile app
//         • Colaboraed as a team to effectively 
//         • Responsible for testing the application using e2e tool, i.e., cypress.
//         • Utilizing Git`