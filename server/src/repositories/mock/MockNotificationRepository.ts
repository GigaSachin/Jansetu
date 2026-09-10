import { INotificationRepository } from '../interfaces/INotificationRepository.js';
import { Notification } from '../../types/index.js';

export class MockNotificationRepository implements INotificationRepository {
  private notifications: Map<string, Notification> = new Map();

  constructor() {
    const seedNotifs: Notification[] = [
      {
        id: 'notif-seed-01',
        user_id: 'usr-citizen-demo',
        title: 'Problem Registered Successfully',
        message: 'Your problem JS-JH-2026-001245 has been recorded and submitted for AI analysis.',
        type: 'STATUS_UPDATE',
        is_read: false,
        issue_id: 'JS-JH-2026-001245',
        target_url: '/citizen/issues/JS-JH-2026-001245',
        created_at: new Date('2026-01-02').toISOString()
      },
      {
        id: 'notif-seed-02',
        user_id: 'usr-citizen-demo',
        title: 'Potential Match Found',
        message: 'BIT Mesra and IIT (ISM) Dhanbad matched with high confidence.',
        type: 'MATCH_FOUND',
        is_read: true,
        issue_id: 'JS-JH-2026-001245',
        target_url: '/citizen/issues/JS-JH-2026-001245',
        created_at: new Date('2026-01-03').toISOString()
      }
    ];

    for (const n of seedNotifs) {
      this.notifications.set(n.id, n);
    }
  }

  async create(notification: Notification): Promise<Notification> {
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => !n.user_id || n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async findAll(): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async markAsRead(id: string): Promise<boolean> {
    const notif = this.notifications.get(id);
    if (!notif) return false;
    notif.is_read = true;
    this.notifications.set(id, notif);
    return true;
  }

  async markAllAsRead(userId?: string): Promise<boolean> {
    for (const [id, notif] of this.notifications.entries()) {
      if (!userId || notif.user_id === userId) {
        notif.is_read = true;
        this.notifications.set(id, notif);
      }
    }
    return true;
  }
}
