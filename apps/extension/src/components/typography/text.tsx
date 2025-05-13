import React from "react";

type FontVariant = Pick<
  React.CSSProperties,
  "fontFamily" | "fontWeight" | "fontSize" | "lineHeight" | "letterSpacing"
>;

enum FontVariantTypes {
  MBodyXL = "MBodyXL",
  MBodyM = "MBodyM",
}
export const fontVariants: Record<FontVariantTypes, FontVariant> = {
  MBodyXL: {
    fontWeight: 500,
    fontSize: "32px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
  MBodyM: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
};

export type TextProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: FontVariant["fontWeight"];
  fontVariant?: FontVariant;
};

const Text: React.FC<TextProps> = ({
  children,
  className,
  color = "black",
  fontSize = "16px",
  fontWeight,
  fontVariant = {},
}) => {
  const fontStyles = {
    color,
    fontSize,
    fontWeight,
    ...fontVariant,
  };
  return (
    <span className={className} style={fontStyles}>
      {children}
    </span>
  );
};

export default Text;
