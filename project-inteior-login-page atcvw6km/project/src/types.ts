export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  password: string;
}

export interface RoomDesign {
  id: string;
  originalImage: string;
  generatedImages: string[];
  style: string;
  roomType: string;
  createdAt: Date;
}

export type RoomType = 'bedroom' | 'kitchen' | 'bathroom' | 'garden' | 'living-room' | 'dining-room' | 'office';

export type DesignStyle = 'modern' | 'traditional' | 'minimalist' | 'industrial' | 'scandinavian' | 'bohemian';