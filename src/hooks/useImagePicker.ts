import { useState, useRef } from 'react';
import  { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface CroppedImage {
  photoPath: string;
  base64: string | ArrayBuffer | null;
  width: number;
  height: number;
  type: 'success';
}

export const useImagePicker = (existingPhotoPath?: string) => {
  const [cPhoto, setCPhoto] = useState<string | undefined>(existingPhotoPath);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(newCrop);
    imgRef.current = e.currentTarget;
  };

  const getCroppedImage = (): Promise<CroppedImage | undefined> => {
    if (!completedCrop || !imgRef.current) return Promise.resolve(undefined);

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

    const ctx = canvas.getContext('2d');
    if (!ctx) return Promise.reject(new Error('Failed to get canvas context'));

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas is empty'));
          const fileUrl = URL.createObjectURL(blob);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve({
              photoPath: fileUrl,
              base64: reader.result,
              width: completedCrop.width,
              height: completedCrop.height,
              type: 'success',
            });
          };
        },
        'image/jpeg',
        0.6
      );
    });
  };

  const openImageLibrary = async (): Promise<CroppedImage | undefined> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const reader = new FileReader();
          reader.onload = () => setCPhoto(reader.result?.toString() || '');
          reader.readAsDataURL(target.files[0]);

          // On attend que l'image soit chargée avant de cropper
          const img = document.createElement('img');
          img.src = URL.createObjectURL(target.files[0]);
          img.onload = async () => {
            imgRef.current = img;
            const cropData: PixelCrop = {
              unit: 'px',
              x: 0,
              y: 0,
              width: img.width,
              height: img.height,
            };
            setCompletedCrop(cropData);
            const cropped = await getCroppedImage();
            resolve(cropped);
          };
        } else {
          resolve(undefined);
        }
      };

      input.click();
    });
  };

  return {
    openImageLibrary,
    cPhoto,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    onImageLoad,
    getCroppedImage,
    imgRef,
  };
};
