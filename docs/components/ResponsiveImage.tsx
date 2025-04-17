export function ResponsiveImage({
  src,
  alt,
  width = "100%",
  style = {},
}: {
  src: string;
  alt?: string;
  width?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: width,
        height: "auto",
        display: "block",
        margin: "0 auto",
        ...style,
      }}
    />
  );
}
