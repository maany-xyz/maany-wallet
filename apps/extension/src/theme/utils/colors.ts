export const convertToRgba = (color: string, opacity = 0.9) => {
  if (color.startsWith("#")) {
    const hexColor = color.slice(1);
    const [red, green, blue] = [0, 2, 4].map((startIndex) =>
      parseInt(hexColor.substr(startIndex, 2), 16)
    );
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }
  return String(color);
};
