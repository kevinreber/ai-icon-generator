import React from "react";

/**
 *
 * @reference
 * This component was reference from this article
 * https://www.jacobparis.com/content/image-placeholders
 */
const ImageWithPlaceholder = ({
  src,
  placeholderSrc,
  onLoad,
  ...props
}: {
  onLoad?: () => void;
  placeholderSrc?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const [imgSrc, setImgSrc] = React.useState(placeholderSrc || src);
  // Store the onLoad prop in a ref to stop new Image() from re-running
  const onLoadRef = React.useRef(onLoad);

  React.useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSrc(src);
      if (onLoadRef.current) {
        onLoadRef.current();
      }
    };
    img.src = src as string;
  }, [src]);

  console.log(imgSrc);

  return <img src={imgSrc} {...props} />;
};

export default ImageWithPlaceholder;
