import { Text } from "@react-three/drei";

export const TextSection = ({title, subtitle, ...props}) => {
    return(
      <group {...props}>
        {/* "!!title" renders title only when there is a title */}
        { !!title && (
            <Text
            color="white"
            anchorX={"left"}
            anchorY="bottom"
            fontSize={0.52}
            maxWidth={2.5}
            lineHeight={1}
            >
            {title}
            </Text>
        )}
        <Text
          color="white"
          anchorX={"left"}
          anchorY="top"
          position-y={-0.1}
          fontSize={0.22}
          maxWidth={2.5}
        >
            {subtitle}
        </Text>
      </group>
    );
};