import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Wand2, Loader2, Home, ChefHat, Bath, Trees as Tree, Sofa } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type RoomType = 'bedroom' | 'kitchen' | 'bathroom' | 'garden' | 'living-room';

interface GeneratedImage {
  id: string;
  url: string;
  style: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const generateDesigns = async () => {
    if (!uploadedImage || !selectedRoom) {
      toast.error('Please upload an image and select a room type first!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to Replicate
    setTimeout(() => {
      const mockGeneratedImages = [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20',
          style: 'Modern'
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
          style: 'Scandinavian'
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1616486701797-0f33f61038df',
          style: 'Industrial'
        }
      ];

      setGeneratedImages(mockGeneratedImages);
      setIsGenerating(false);
      toast.success('Designs generated successfully!');
    }, 3000);
  };

  const roomTypes = [
    { type: 'bedroom' as RoomType, icon: Home, label: 'Bedroom' },
    { type: 'kitchen' as RoomType, icon: ChefHat, label: 'Kitchen' },
    { type: 'bathroom' as RoomType, icon: Bath, label: 'Bathroom' },
    { type: 'garden' as RoomType, icon: Tree, label: 'Garden' },
    { type: 'living-room' as RoomType, icon: Sofa, label: 'Living Room' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Wand2 className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">RoomID</h1>
          </div>
          <p className="mt-2 text-gray-600">Transform your space with AI-powered design suggestions</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">Drag & drop your room image here, or click to select</p>
          </div>
        </motion.div>

        {/* Room Type Selection */}
        {uploadedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Select Room Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {roomTypes.map(({ type, icon: Icon, label }) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRoom(type)}
                  className={`p-4 rounded-lg flex flex-col items-center ${
                    selectedRoom === type
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-white border border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Icon className="h-6 w-6 text-purple-600" />
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Preview and Generate Section */}
        {uploadedImage && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Original Room</h2>
              <img
                src={uploadedImage}
                alt="Uploaded room"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Generate Designs</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateDesigns}
                disabled={isGenerating}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating designs...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    <span>Generate AI Designs</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Generated Designs */}
        <AnimatePresence>
          {generatedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-semibold mb-6">AI-Generated Designs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {generatedImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={image.url}
                      alt={`Generated ${image.style} design`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{image.style} Style</h3>
                      <p className="text-sm text-gray-500">Click to view full size</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;