import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({title, subtitle, ...props}) => {
    return(
      <group {...props}>
        {/* "!!title" renders title only when there is a title */}
        { !!title && (
            <Text
            color="black"
            anchorX={"left"}
            anchorY="bottom"
            fontSize={0.52}
            maxWidth={2.5}
            lineHeight={1}
            >
            {title}
            <meshStandardMaterial 
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat} // the shader apper only when close effect
            />
            </Text>
        )}
        <Text
          color="black"
          anchorX={"left"}
          anchorY="top"
          position-y={-0.1}
          fontSize={0.22}
          maxWidth={2.5}
        >
            {subtitle}
            <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
        </Text>
      </group>
    );
};