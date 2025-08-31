import React from "react";
import { Colors } from "./../../../constants/Colors";
import { Shadows } from "./../../../constants/Shadows";
import { useImagePicker } from "./../../../hooks/useImagePicker";
import { CButton } from "./../../../components/Buttons/CButton";
import { CImage } from "./../../../components/CImage";

interface PhotoPreviewProps {
  photoPath: string;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photoPath }) => {
  const { cPhoto, openImageLibrary } = useImagePicker(photoPath);

  return (
    <div style={styles.container}>
      <div style={styles.outterContainer}>
        <div style={styles.innerContainer}>
          {cPhoto && (
           <CImage
  source={cPhoto}
  height="100%"
  width="100%"
  resizeMode="cover"
/>
          )}
        </div>
      </div>
      <CButton
        style={styles.buttonContainer}
        buttonType="seanceFull"
        text="onboarding.retakePhoto"
        small
        onClick={() => openImageLibrary()}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { alignSelf: "center", position: "relative" },
  outterContainer: {
    width: 288,
    height: 327,
    backgroundColor: Colors.white,
    transform: "rotate(-3deg)",
    borderRadius: 4,
    ...Shadows.largeWhite,
  },
  innerContainer: {
    overflow: "hidden",
    margin: 12,
    marginBottom: 39,
    height: "calc(100% - 51px)", // adjust inner image height
  },
  buttonContainer: {
    position: "absolute",
    bottom: -26,
    left: "50%",
    transform: "translateX(-50%)",
  },
};
