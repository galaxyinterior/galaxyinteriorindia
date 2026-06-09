import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  aspectRatio: number; // e.g., 16/9 or 9/16
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
}

export default function ImageCropperModal({ imageSrc, aspectRatio, onCropComplete, onCancel }: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleComplete = async () => {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas');
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], `cropped_${Date.now()}.jpeg`, { type: 'image/jpeg' });
        onCropComplete(file);
      }, 'image/jpeg', 0.9);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-[#08162d] border border-white/10 rounded-2xl p-6 w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Crop Image ({aspectRatio > 1 ? 'Desktop 16:9' : 'Mobile 9:16'})</h2>
          <button onClick={onCancel} className="text-white/50 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto bg-black rounded-lg border border-white/5 flex items-center justify-center">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
          >
            <img 
              ref={imgRef} 
              src={imageSrc} 
              alt="Crop preview" 
              style={{ maxHeight: '60vh', objectFit: 'contain' }}
              onLoad={(e) => {
                const { width, height } = e.currentTarget;
                // Center default crop
                const cropWidthInPx = width * 0.9;
                const cropHeightInPx = cropWidthInPx / aspectRatio;
                let finalCrop = { unit: 'px' as const, width: cropWidthInPx, height: cropHeightInPx, x: (width - cropWidthInPx) / 2, y: (height - cropHeightInPx) / 2 };
                
                if (cropHeightInPx > height * 0.9) {
                  finalCrop.height = height * 0.9;
                  finalCrop.width = finalCrop.height * aspectRatio;
                  finalCrop.x = (width - finalCrop.width) / 2;
                  finalCrop.y = (height - finalCrop.height) / 2;
                }
                
                // Convert px to percent
                setCrop({
                  unit: '%',
                  width: (finalCrop.width / width) * 100,
                  height: (finalCrop.height / height) * 100,
                  x: (finalCrop.x / width) * 100,
                  y: (finalCrop.y / height) * 100,
                });
              }}
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel} className="border-white/10 text-white bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleComplete} disabled={!completedCrop} className="bg-accent text-primary font-bold">
            <Check className="w-4 h-4 mr-2" /> Apply Crop
          </Button>
        </div>
      </div>
    </div>
  );
}
