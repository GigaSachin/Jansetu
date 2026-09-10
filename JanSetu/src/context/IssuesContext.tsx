import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Issue, IssueStatus, Notification, Milestone, IssueUpdate } from '../types';
import { MOCK_ISSUES, MOCK_NOTIFICATIONS } from '../data/mockData';
import { problemService, CreateProblemPayload } from '../services/problemService';

interface IssuesContextType {
  issues: Issue[];
  notifications: Notification[];
  unreadNotificationCount: number;
  addIssue: (newIssue: Omit<Issue, 'id' | 'reportedAt' | 'progressPercent' | 'upvotesCount' | 'milestones' | 'updates'>) => Issue;
  getIssueById: (id: string) => Issue | undefined;
  toggleUpvote: (id: string) => void;
  updateIssueStatus: (id: string, newStatus: IssueStatus, note?: string, authorName?: string, authorRole?: any) => void;
  addMilestone: (issueId: string, milestone: Omit<Milestone, 'id'>) => void;
  toggleMilestoneStatus: (issueId: string, milestoneId: string) => void;
  addIssueUpdate: (issueId: string, update: Omit<IssueUpdate, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  refreshFromBackend: () => Promise<void>;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export const IssuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(() => {
    const saved = localStorage.getItem('jansetu_issues');
    return saved ? JSON.parse(saved) : MOCK_ISSUES;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('jansetu_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const refreshFromBackend = useCallback(async () => {
    try {
      const backendIssues = await problemService.getProblems();
      if (backendIssues && backendIssues.length > 0) {
        setIssues((prev) => {
          // Merge backend issues with any existing local issues not yet in backend
          const backendIds = new Set(backendIssues.map(b => b.id.toLowerCase()));
          const localOnly = prev.filter(p => !backendIds.has(p.id.toLowerCase()));
          return [...backendIssues, ...localOnly];
        });
      }
    } catch {
      // Backend not running, gracefully keep local state
    }
  }, []);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  useEffect(() => {
    localStorage.setItem('jansetu_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('jansetu_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const calculateProgress = (status: IssueStatus): number => {
    switch (status) {
      case 'REPORTED': return 10;
      case 'VERIFIED': return 25;
      case 'MATCHED': return 40;
      case 'COLLABORATING': return 55;
      case 'PROTOTYPING': return 75;
      case 'DEPLOYED': return 90;
      case 'IMPACT_VERIFIED': return 100;
      case 'REJECTED': return 0;
      default: return 10;
    }
  };

  const addIssue = (newIssueData: Omit<Issue, 'id' | 'reportedAt' | 'progressPercent' | 'upvotesCount' | 'milestones' | 'updates'>): Issue => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `JS-JH-2026-${randomNum}`;
    const now = new Date().toISOString();

    const createdIssue: Issue = {
      ...newIssueData,
      id: newId,
      reportedAt: now,
      progressPercent: 10,
      upvotesCount: 1,
      hasUpvoted: true,
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Problem Submitted & Queued',
          description: 'Citizen report registered on JanSetu network.',
          status: 'COMPLETED',
          completedAt: now.split('T')[0]
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Official Verification by Local Authority',
          description: 'Awaiting on-site field assessment and priority confirmation.',
          status: 'IN_PROGRESS'
        },
        {
          id: `m-${Date.now()}-3`,
          title: 'AI Collaborative Matching',
          description: 'Match with academic departments and CSR support.',
          status: 'PENDING'
        },
        {
          id: `m-${Date.now()}-4`,
          title: 'Solution Design & Prototyping',
          description: 'Collaborative development of practical solution.',
          status: 'PENDING'
        },
        {
          id: `m-${Date.now()}-5`,
          title: 'Field Deployment & Impact Verification',
          description: 'Real-world installation and community impact audit.',
          status: 'PENDING'
        }
      ],
      updates: [
        {
          id: `upd-${Date.now()}`,
          timestamp: now,
          authorName: newIssueData.reportedBy.name,
          authorRole: 'citizen',
          content: 'Problem reported on JanSetu portal. Awaiting official verification.',
          stage: 'REPORTED'
        }
      ]
    };

    setIssues(prev => [createdIssue, ...prev]);

    // Push system notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Problem Registered Successfully',
      message: `Your report #${newId} has been logged and assigned for verification.`,
      timestamp: now,
      read: false,
      type: 'STATUS_UPDATE',
      issueId: newId,
      targetUrl: `/citizen/issues/${newId}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Asynchronously synchronize with Backend API Gateway
    const payload: CreateProblemPayload = {
      title: newIssueData.title,
      description: newIssueData.description,
      category: newIssueData.category,
      district: newIssueData.location?.district || 'Ramgarh',
      locality: newIssueData.location?.locality,
      village_town: newIssueData.location?.city,
      state: newIssueData.location?.state || 'Jharkhand',
      latitude: newIssueData.location?.coordinates?.lat,
      longitude: newIssueData.location?.coordinates?.lng,
      severity: newIssueData.severity,
      estimated_affected_population: String(newIssueData.estimatedPeopleAffected || 1200)
    };

    problemService.createProblem(payload).then(res => {
      if (res && res.issue_id) {
        // Sync issue_id if returned
        setIssues(prev => prev.map(item => item.id === newId ? { ...item, id: res.issue_id } : item));
      }
    }).catch(err => {
      console.warn('Backend sync note:', err.message);
    });

    return createdIssue;
  };

  const getIssueById = (id: string) => {
    return issues.find(i => i.id.toLowerCase() === id.toLowerCase());
  };

  const toggleUpvote = (id: string) => {
    setIssues(prev =>
      prev.map(item => {
        if (item.id === id) {
          const hasUpvoted = !item.hasUpvoted;
          return {
            ...item,
            hasUpvoted,
            upvotesCount: hasUpvoted ? item.upvotesCount + 1 : item.upvotesCount - 1
          };
        }
        return item;
      })
    );
  };

  const updateIssueStatus = (
    id: string,
    newStatus: IssueStatus,
    note?: string,
    authorName: string = 'Authority Officer',
    authorRole: any = 'government'
  ) => {
    const now = new Date().toISOString();
    setIssues(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newUpdates: IssueUpdate[] = [
            ...(item.updates || []),
            {
              id: `upd-${Date.now()}`,
              timestamp: now,
              authorName,
              authorRole,
              content: note || `Status transitioned to ${newStatus.replace('_', ' ')}`,
              stage: newStatus
            }
          ];

          return {
            ...item,
            status: newStatus,
            progressPercent: calculateProgress(newStatus),
            updates: newUpdates
          };
        }
        return item;
      })
    );

    // Sync with backend
    problemService.updateStatus(id, newStatus, note).catch(() => {});

    // Notify citizen
    const targetIssue = issues.find(i => i.id === id);
    if (targetIssue) {
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: `Update on ${id}: ${newStatus}`,
        message: note || `The status for "${targetIssue.title}" has been updated to ${newStatus}.`,
        timestamp: now,
        read: false,
        type: 'STATUS_UPDATE',
        issueId: id,
        targetUrl: `/citizen/issues/${id}`
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const addMilestone = (issueId: string, milestone: Omit<Milestone, 'id'>) => {
    setIssues(prev =>
      prev.map(item => {
        if (item.id === issueId) {
          const newMilestone: Milestone = {
            ...milestone,
            id: `ms-${Date.now()}`
          };
          return {
            ...item,
            milestones: [...item.milestones, newMilestone]
          };
        }
        return item;
      })
    );
  };

  const toggleMilestoneStatus = (issueId: string, milestoneId: string) => {
    setIssues(prev =>
      prev.map(item => {
        if (item.id === issueId) {
          const updatedMilestones: Milestone[] = item.milestones.map(m => {
            if (m.id === milestoneId) {
              const newStatus: 'COMPLETED' | 'IN_PROGRESS' = m.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
              return {
                ...m,
                status: newStatus,
                completedAt: newStatus === 'COMPLETED' ? new Date().toISOString().split('T')[0] : undefined
              };
            }
            return m;
          });
          return { ...item, milestones: updatedMilestones };
        }
        return item;
      })
    );
  };

  const addIssueUpdate = (issueId: string, update: Omit<IssueUpdate, 'id' | 'timestamp'>) => {
    const now = new Date().toISOString();
    setIssues(prev =>
      prev.map(item => {
        if (item.id === issueId) {
          const newUpdate: IssueUpdate = {
            ...update,
            id: `upd-${Date.now()}`,
            timestamp: now
          };
          return {
            ...item,
            updates: [newUpdate, ...(item.updates || [])]
          };
        }
        return item;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <IssuesContext.Provider
      value={{
        issues,
        notifications,
        unreadNotificationCount,
        addIssue,
        getIssueById,
        toggleUpvote,
        updateIssueStatus,
        addMilestone,
        toggleMilestoneStatus,
        addIssueUpdate,
        markNotificationRead,
        markAllNotificationsRead,
        refreshFromBackend
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssuesProvider');
  }
  return context;
};
