export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  membershipStatus: 'active' | 'inactive';
  subscribedSports: string[];
}

export interface Sport {
  id: string;
  name: string;
  description: string;
  maxMembers: number;
  currentMembers: number;
  category: string;
  imageUrl?: string;
}

export interface Subscription {
  id: string;
  memberId: string;
  sportId: string;
  status: 'active' | 'cancelled';
  subscriptionDate: string;
} 