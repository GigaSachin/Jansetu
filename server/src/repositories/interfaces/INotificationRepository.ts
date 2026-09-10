import { Notification } from '../../types/index.js';

export interface INotificationRepository {
  create(notification: Notification): Promise<Notification>;
  findByUserId(userId: string): Promise<Notification[]>;
  findAll(): Promise<Notification[]>;
  markAsRead(id: string): Promise<boolean>;
  markAllAsRead(userId?: string): Promise<boolean>;
}
