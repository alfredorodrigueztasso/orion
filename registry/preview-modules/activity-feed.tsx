/**
 * Preview module for ActivityFeed section
 * Timeline of events and activities for SaaS dashboards
 */

import React, { useState } from 'react';
import { ActivityFeed } from '@orion-ds/blocks';

const sampleActivities = [
  {
    id: '1',
    type: 'comment',
    actor: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    title: 'commented on "Dashboard Redesign"',
    description: 'This looks great! Can we add more spacing between the cards?',
    relativeTime: '2 minutes ago',
    iconVariant: 'primary',
  },
  {
    id: '2',
    type: 'update',
    actor: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    title: 'updated the project status',
    relativeTime: '1 hour ago',
    metadata: {
      Status: 'In Progress',
      Priority: 'High',
    },
    iconVariant: 'success',
  },
  {
    id: '3',
    type: 'create',
    actor: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    title: 'created a new task "Update navigation"',
    relativeTime: '3 hours ago',
    iconVariant: 'warning',
  },
  {
    id: '4',
    type: 'complete',
    actor: {
      name: 'Jordan Lee',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    title: 'completed "API Integration"',
    relativeTime: '5 hours ago',
    iconVariant: 'success',
  },
  {
    id: '5',
    type: 'upload',
    actor: {
      name: 'Taylor Kim',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    title: 'uploaded 3 design files',
    relativeTime: '1 day ago',
    metadata: {
      Files: 'wireframe-v2.fig, mockup.sketch, icons.svg',
    },
  },
];

// Preview components - proper functional components for React hooks
const BasicActivityFeedPreview = () => (
  <div style={{ maxWidth: '600px' }}>
    <ActivityFeed activities={sampleActivities.slice(0, 4)} />
  </div>
);

const WithFiltersPreview = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { label: 'All Activity', value: 'all', count: 24 },
    { label: 'Comments', value: 'comment', count: 8 },
    { label: 'Updates', value: 'update', count: 12 },
    { label: 'Completed', value: 'complete', count: 4 },
  ];

  return (
    <div style={{ maxWidth: '600px' }}>
      <ActivityFeed
        activities={sampleActivities}
        showFilters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </div>
  );
};

const CompactModePreview = () => (
  <div style={{ maxWidth: '600px' }}>
    <ActivityFeed
      activities={sampleActivities}
      compact
    />
  </div>
);

const WithLoadMorePreview = () => {
  const [loadedCount, setLoadedCount] = useState(3);

  return (
    <div style={{ maxWidth: '600px' }}>
      <ActivityFeed
        activities={sampleActivities.slice(0, loadedCount)}
        hasMore={loadedCount < sampleActivities.length}
        onLoadMore={() => setLoadedCount(prev => Math.min(prev + 2, sampleActivities.length))}
      />
    </div>
  );
};

const LoadingStatePreview = () => (
  <div style={{ maxWidth: '600px' }}>
    <ActivityFeed
      activities={sampleActivities.slice(0, 2)}
      loading
    />
  </div>
);

const EmptyStatePreview = () => (
  <div style={{ maxWidth: '600px' }}>
    <ActivityFeed
      activities={[]}
      emptyMessage="No recent activity. Start by creating a task or commenting on a project."
    />
  </div>
);

export const previews = [
  {
    title: 'Basic Activity Feed',
    render: BasicActivityFeedPreview,
  },
  {
    title: 'With Filters',
    render: WithFiltersPreview,
  },
  {
    title: 'Compact Mode',
    render: CompactModePreview,
  },
  {
    title: 'With Load More',
    render: WithLoadMorePreview,
  },
  {
    title: 'Loading State',
    render: LoadingStatePreview,
  },
  {
    title: 'Empty State',
    render: EmptyStatePreview,
  },
];

export default previews;
