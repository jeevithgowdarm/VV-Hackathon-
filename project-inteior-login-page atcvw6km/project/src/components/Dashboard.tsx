import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageUpload } from './ImageUpload';
import { RoomTypeSelector } from './RoomTypeSelector';
import { RoomType, DesignStyle } from '../types';
import { Palette, Loader } from 'lucide-react';

export function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    setGeneratedImages([]);
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedRoomType) return;

    setIsGenerating(true);
    try {
      // Here we would normally call the Replicate API
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate generated images with placeholder URLs
      setGeneratedImages([
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
        'https://images.unsplash.com/photo-1616486701797-122bc4e9170c',
        'https://images.unsplash.com/photo-1616486701944-5b45ce3d0d49'
      ]);
    } catch (error) {
      console.error('Error generating designs:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Room Designs</h2>
        <p className="text-gray-600">
          Upload a photo of your room and let AI suggest beautiful interior designs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Upload Room Photo</h3>
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {selectedImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected room"
                className="rounded-lg w-full object-cover"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Select Room Type</h3>
          <RoomTypeSelector
            selectedType={selectedRoomType}
            onSelect={setSelectedRoomType}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={!selectedImage || !selectedRoomType || isGenerating}
            className={`mt-8 w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2
              ${isGenerating || !selectedImage || !selectedRoomType
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium`}
          >
            {isGenerating ? (
              <>
                <Loader className="animate-spin" />
                Generating Designs...
              </>
            ) : (
              <>
                <Palette />
                Generate Designs
              </>
            )}
          </motion.button>
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Generated Designs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {generatedImages.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <img
                  src={url}
                  alt={`Generated design ${index + 1}`}
                  className="rounded-lg w-full h-64 object-cover shadow-lg hover:shadow-xl transition-shadow"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}