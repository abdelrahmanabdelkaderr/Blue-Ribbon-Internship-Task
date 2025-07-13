import { Sport, Member, Subscription } from '../types';

export const mockSports: Sport[] = [
  {
    id: '1',
    name: 'Football',
    description: 'The beautiful game - 11 players per team',
    maxMembers: 50,
    currentMembers: 32,
    category: 'Team Sports',
    imageUrl: '/football.jpg'
  },
  {
    id: '2',
    name: 'Basketball',
    description: 'Fast-paced indoor team sport',
    maxMembers: 30,
    currentMembers: 25,
    category: 'Team Sports',
    imageUrl: '/basketball.jpg'
  },
  {
    id: '3',
    name: 'Tennis',
    description: 'Individual or doubles racquet sport',
    maxMembers: 40,
    currentMembers: 28,
    category: 'Racquet Sports',
    imageUrl: '/tennis.jpg'
  },
  {
    id: '4',
    name: 'Swimming',
    description: 'Low-impact full body workout',
    maxMembers: 60,
    currentMembers: 45,
    category: 'Aquatic Sports',
    imageUrl: '/swimming.jpg'
  },
  {
    id: '5',
    name: 'Golf',
    description: 'Precision club and ball sport',
    maxMembers: 35,
    currentMembers: 22,
    category: 'Precision Sports',
    imageUrl: '/golf.jpg'
  }
];

export const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    joinDate: '2023-01-15',
    membershipStatus: 'active',
    subscribedSports: ['1', '3']
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+1-555-0456',
    dateOfBirth: '1988-12-03',
    joinDate: '2023-02-20',
    membershipStatus: 'active',
    subscribedSports: ['2', '4']
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1-555-0789',
    dateOfBirth: '1995-08-22',
    joinDate: '2023-03-10',
    membershipStatus: 'active',
    subscribedSports: ['1', '5']
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@email.com',
    phone: '+1-555-0321',
    dateOfBirth: '1992-11-08',
    joinDate: '2023-04-05',
    membershipStatus: 'inactive',
    subscribedSports: ['3']
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    memberId: '1',
    sportId: '1',
    subscriptionDate: '2023-01-15',
    status: 'active'
  },
  {
    id: '2',
    memberId: '1',
    sportId: '3',
    subscriptionDate: '2023-02-01',
    status: 'active'
  },
  {
    id: '3',
    memberId: '2',
    sportId: '2',
    subscriptionDate: '2023-02-20',
    status: 'active'
  },
  {
    id: '4',
    memberId: '2',
    sportId: '4',
    subscriptionDate: '2023-03-01',
    status: 'active'
  },
  {
    id: '5',
    memberId: '3',
    sportId: '1',
    subscriptionDate: '2023-03-10',
    status: 'active'
  },
  {
    id: '6',
    memberId: '3',
    sportId: '5',
    subscriptionDate: '2023-03-15',
    status: 'active'
  },
  {
    id: '7',
    memberId: '4',
    sportId: '3',
    subscriptionDate: '2023-04-05',
    status: 'cancelled'
  }
]; 