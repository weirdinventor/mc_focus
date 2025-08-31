import { CButton } from "./../../../components/Buttons/CButton";
import { CText } from "./../../../components/CText";
import { IconicText } from "./../../../components/IconicText";
import { Colors } from "./../../../constants/Colors";
import { getScreen } from "./../../../utils/getScreen";
import React, { useState, useRef, useEffect } from "react";
import { ProChip } from "./ProChip";

interface SubCardProps {
  starter: boolean;
  price?: string;
  onPressHandler: () => void;
}

export const SubCard = ({ starter, price, onPressHandler }: SubCardProps) => {
  const [boxHeight, setBoxHeight] = useState<number>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setBoxHeight(width * 1.5); // comme ton onLayout RN
      }
    });

    observer.observe(divRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={divRef}
      style={{ ...styles.container, height: boxHeight ?? "auto" }}
    >
      <div>
        {/* Titre */}
        <div style={styles.titleWrapper}>
          <CText
            toUppercase
            size="lg_extraBold"
            text={starter ? "subs.starter" : "live.moulaclubPlus"}
          />
          {!starter && <ProChip />}
        </div>

        {/* Sous-titre */}
        <CText mt={4} mb={16} size="md_medium" text="subs.lorem" color="grey" />

        {/* Prix */}
        <CText>
          <CText
            size="xxl_extraBold"
            text="price.pNum"
            textOptions={{ price: starter ? 0 : price ?? "—" }}
          />
          <CText size="sm_medium" color="grey" text="price.perMonth" />
        </CText>

        <CText
          mb={24}
          size="sm_medium"
          text={starter ? "subs.free" : "subs.fullYear"}
          color="grey9"
          textOptions={{ amount: "64,99" }}
        />

        {/* Bénéfices */}
        <div style={styles.iconicTextsContainer}>
          <IconicText
            iconName="star"
            text={starter ? "subs.benefits.freeLive" : "subs.benefits.everyday"}
          />
          <IconicText
            iconName="star"
            text={starter ? "subs.benefits.groups" : "subs.benefits.groupsPrem"}
          />
          {!starter && (
            <IconicText iconName="star" text="subs.benefits.pdfResources" />
          )}
          <IconicText
            iconName="star"
            text={starter ? "subs.benefits.level" : "subs.benefits.experts"}
          />
          {!starter && (
            <>
              <IconicText iconName="star" text="subs.benefits.liveBuisiness" />
              <IconicText iconName="star" text="subs.benefits.prioCowork" />
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      <CButton
        onClick={onPressHandler}
        mt={16}
        text="subs.join"
        buttonType="colored"
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flexGrow: 1,
    alignContent: "space-between",
    width: getScreen().width - 48,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    paddingTop: 32,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
  },
  iconicTextsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
};
