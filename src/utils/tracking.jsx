// Utility functions for tracking visitors and profile views
export const Tracking = {
  // Initialize tracking
  init() {
    this.ensureStatsExist();
    this.trackPageView();
  },

  // Ensure stats object exists in localStorage
  ensureStatsExist() {
    let stats = JSON.parse(localStorage.getItem('stats') || '{}');
    
    // Set default values if they don't exist
    const defaultStats = {
      totalVisitors: 0,
      profileViews: 0,
      lastVisit: null,
      platformStats: {}
    };
    
    stats = { ...defaultStats, ...stats };
    localStorage.setItem('stats', JSON.stringify(stats));
    
    return stats;
  },

  // Track a page view (unique visitor)
  trackPageView() {
    const stats = this.ensureStatsExist();
    const now = new Date().toISOString();
    const lastVisit = stats.lastVisit;
    
    // Consider it a new visit if last visit was more than 30 minutes ago
    const isNewVisitor = !lastVisit || 
      (new Date(now) - new Date(lastVisit)) > 30 * 60 * 1000;
    
    if (isNewVisitor) {
      stats.totalVisitors += 1;
      stats.lastVisit = now;
      localStorage.setItem('stats', JSON.stringify(stats));
    }
    
    return isNewVisitor;
  },

  // Track a profile view (social link click)
  trackProfileView(platform) {
    const stats = this.ensureStatsExist();
    stats.profileViews += 1;
    
    // Track which platform was clicked
    const platformStats = stats.platformStats || {};
    platformStats[platform] = (platformStats[platform] || 0) + 1;
    stats.platformStats = platformStats;
    
    localStorage.setItem('stats', JSON.stringify(stats));
    
    return stats.profileViews;
  },

  // Get current stats
  getStats() {
    return this.ensureStatsExist();
  },

  // Reset stats (for testing)
  resetStats() {
    const stats = {
      totalVisitors: 0,
      profileViews: 0,
      lastVisit: null,
      platformStats: {}
    };
    localStorage.setItem('stats', JSON.stringify(stats));
    return stats;
  }
};

// Social link tracking component
export const TrackedSocialLink = ({ 
  href, 
  platform, 
  children, 
  className = '',
  ...props 
}) => {
  const handleClick = () => {
    Tracking.trackProfileView(platform);
    
    // Open in new tab
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};