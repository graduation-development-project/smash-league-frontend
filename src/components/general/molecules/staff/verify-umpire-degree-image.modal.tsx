'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Image } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface UmpireDegree {
  degree: string[];
  degreeTitle: string;
  description: string;
  id: string;
  typeOfDegree: string;
  userId: string;
  userVerificationId: string;
}

interface UmpireDegreeModalProps {
  umpireDegrees: UmpireDegree;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setUmpireDegree: (degree: any) => void;
}

export default function VerifyUmpireDegreeModal({
  umpireDegrees,
  isOpen,
  setIsOpen,
  setUmpireDegree,
}: UmpireDegreeModalProps) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  // Reset selected image when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImageUrl('');
    }
  }, [isOpen]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {umpireDegrees?.degreeTitle || 'Degree Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{umpireDegrees?.typeOfDegree}</Badge>
          </div>

          <div className="flex gap-4 justify-center items-center w-full h-full">
            {umpireDegrees?.degree?.map((imgUrl, index) => (
              <div
                key={index}
                className="relative cursor-pointer border rounded overflow-hidden"
                onClick={() => handleImageClick(imgUrl)}
              >
                <Image
                  src={imgUrl}
                  alt={`Degree image ${index + 1}`}
                  width={450}
                  height={300}
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* {selectedImageUrl && (
            <div className="mt-4 flex justify-center">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  Preview
                </h3>
                <Image
                  src={selectedImageUrl}
                  alt="Selected image preview"
                  width={600}
                  height={400}
                  className="object-contain rounded"
                />
              </div>
            </div>
          )} */}
          {umpireDegrees?.description && (
            <TextArea value={umpireDegrees?.description} disabled />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
