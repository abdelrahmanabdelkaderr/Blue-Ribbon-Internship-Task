export interface Sport {
  id: string;
  name: string;
  description: string;
  maxMembers: number;
  currentMembers: number;
  category: string;
  imageUrl?: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  membershipStatus: 'active' | 'inactive';
  subscribedSports: string[]; // Array of sport IDs
}

export interface Subscription {
  id: string;
  memberId: string;
  sportId: string;
  subscriptionDate: string;
  status: 'active' | 'cancelled';
} 