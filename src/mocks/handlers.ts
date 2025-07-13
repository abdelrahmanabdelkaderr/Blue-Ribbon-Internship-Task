import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/sports', ({ request }) => {
    return HttpResponse.json([
      { id: '1', name: 'Football', category: 'Team Sports', maxMembers: 22, currentMembers: 18 },
      { id: '2', name: 'Tennis', category: 'Racquet Sports', maxMembers: 4, currentMembers: 2 },
    ]);
  }),
  http.get('/api/members', ({ request }) => {
    return HttpResponse.json([
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', dateOfBirth: '1990-01-01', joinDate: '2020-01-01', membershipStatus: 'active', subscribedSports: ['1'] },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', dateOfBirth: '1992-02-02', joinDate: '2021-02-02', membershipStatus: 'inactive', subscribedSports: [] },
    ]);
  }),
  http.post('/api/members', async ({ request }) => {
    const data = await request.json();
    const memberObj = typeof data === 'object' && data !== null ? data : {};
    // Simulate assigning a new ID
    const newMember = { ...memberObj, id: String(Math.floor(Math.random() * 10000)) };
    return HttpResponse.json(newMember, { status: 201 });
  }),
  http.get('/api/subscriptions', ({ request }) => {
    return HttpResponse.json([
      { id: '1', memberId: '1', sportId: '1', status: 'active', subscriptionDate: '2023-01-01' },
      { id: '2', memberId: '2', sportId: '2', status: 'cancelled', subscriptionDate: '2023-02-01' },
    ]);
  }),
]; 