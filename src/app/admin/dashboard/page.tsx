'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Send,
  Filter,
  Eye,
  TrendingUp,
  MousePointer,
  AlertTriangle
} from 'lucide-react';

// Types
interface SignupData {
  id: number;
  name: string;
  email: string;
  app: string;
  social_media?: string;
  comments?: string;
  created_at: string;
  email_sent?: boolean;
  email_sent_at?: string;
}

interface DashboardStats {
  totalSignups: number;
  appBreakdown: Record<string, number>;
  totalEmailsSent: number;
  emailsWaiting: number;
  emailsSentByApp: Record<string, number>;
}

interface FormAnalytics {
  totalPageVisits: number;
  totalFormStarts: number;
  totalFormAbandons: number;
  totalFormSubmits: number;
  conversionRates: {
    visitToStart: number;
    startToSubmit: number;
    overallConversion: number;
  };
  fieldInteractions: Record<string, number>;
  appSelectionAnalytics: Record<string, number>;
  abandonmentPoints: Record<string, number>;
  recentInteractions: Array<{
    event_type: string;
    field_name?: string;
    timestamp: string;
  }>;
}

interface InviteFormData {
  selectedApp: string;
  inviteLink: string;
  selectedUsers: string[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'invite' | 'analytics'>('dashboard');
  const [signups, setSignups] = useState<SignupData[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSignups: 0,
    appBreakdown: {},
    totalEmailsSent: 0,
    emailsWaiting: 0,
    emailsSentByApp: {}
  });
  const [formAnalytics, setFormAnalytics] = useState<FormAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteForm, setInviteForm] = useState<InviteFormData>({
    selectedApp: '',
    inviteLink: '',
    selectedUsers: []
  });
  const [isSendingInvites, setIsSendingInvites] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch signups data
  const fetchSignups = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/signups');
      if (response.ok) {
        const data = await response.json();
        setSignups(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching signups:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch form analytics
  const fetchFormAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/form-analytics');
      if (response.ok) {
        const data = await response.json();
        setFormAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching form analytics:', error);
    }
  }, []);

  // Calculate dashboard stats
  const calculateStats = (signupData: SignupData[]) => {
    const appBreakdown: Record<string, number> = {};
    const emailsSentByApp: Record<string, number> = {};
    let totalEmailsSent = 0;
    let emailsWaiting = 0;

    signupData.forEach(signup => {
      // App breakdown
      appBreakdown[signup.app] = (appBreakdown[signup.app] || 0) + 1;
      
      // Email tracking
      if (signup.email_sent) {
        totalEmailsSent++;
        emailsSentByApp[signup.app] = (emailsSentByApp[signup.app] || 0) + 1;
      } else {
        emailsWaiting++;
      }
    });

    setStats({
      totalSignups: signupData.length,
      appBreakdown,
      totalEmailsSent,
      emailsWaiting,
      emailsSentByApp
    });
  };

  // Send invites
  const handleSendInvites = async () => {
    if (!inviteForm.selectedApp || !inviteForm.inviteLink || inviteForm.selectedUsers.length === 0) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    setIsSendingInvites(true);
    try {
      const response = await fetch('/api/admin/send-invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app: inviteForm.selectedApp,
          inviteLink: inviteForm.inviteLink,
          emails: inviteForm.selectedUsers
        })
      });

      if (response.ok) {
        const result = await response.json();
        setToast({ 
          message: `${result.emailsSent} emails sent out for ${inviteForm.selectedApp}`, 
          type: 'success' 
        });
        // Reset form
        setInviteForm({
          selectedApp: '',
          inviteLink: '',
          selectedUsers: []
        });
        // Refresh data
        fetchSignups();
      } else {
        throw new Error('Failed to send invites');
      }
    } catch (error) {
      console.error('Error sending invites:', error);
      setToast({ message: 'Failed to send invites', type: 'error' });
    } finally {
      setIsSendingInvites(false);
    }
  };

  // Get available apps
  const availableApps = Array.from(new Set(signups.map(s => s.app)));


  // Get users without emails sent
  const getUsersWithoutEmails = (app: string) => {
    return signups.filter(s => s.app === app && !s.email_sent);
  };

  useEffect(() => {
    fetchSignups();
    fetchFormAnalytics();
  }, [fetchSignups, fetchFormAnalytics]);

  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-space via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-indigo-900 to-purple-900">
      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 mt-1">Manage pre-beta signups and invites</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <span className="text-white text-sm">Total Signups: {stats.totalSignups}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Form Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('invite')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all duration-300 ${
              activeTab === 'invite'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Send className="w-5 h-5" />
            <span className="font-semibold">Send Invites</span>
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Signups</p>
                    <p className="text-3xl font-bold text-white">{stats.totalSignups}</p>
                  </div>
                  <Users className="w-8 h-8 text-pink-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Emails Sent</p>
                    <p className="text-3xl font-bold text-white">{stats.totalEmailsSent}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Waiting</p>
                    <p className="text-3xl font-bold text-white">{stats.emailsWaiting}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Apps</p>
                    <p className="text-3xl font-bold text-white">{availableApps.length}</p>
                  </div>
                  <Filter className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* App Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">App Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(stats.appBreakdown).map(([app, count]) => (
                  <div key={app} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{app}</h4>
                      <span className="text-pink-400 font-bold">{count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>Emails sent: {stats.emailsSentByApp[app] || 0}</span>
                      <span>Waiting: {count - (stats.emailsSentByApp[app] || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Signups */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Signups</h3>
              <div className="space-y-3">
                {signups.slice(0, 10).map((signup) => (
                  <div key={signup.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {signup.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{signup.name}</p>
                        <p className="text-gray-300 text-sm">{signup.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{signup.app}</p>
                      <div className="flex items-center space-x-2">
                        {signup.email_sent ? (
                          <span className="text-green-400 text-xs flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Sent
                          </span>
                        ) : (
                          <span className="text-yellow-400 text-xs flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Waiting
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && formAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Form Funnel Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Page Visits</p>
                    <p className="text-3xl font-bold text-white">{formAnalytics.totalPageVisits}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Form Starts</p>
                    <p className="text-3xl font-bold text-white">{formAnalytics.totalFormStarts}</p>
                    <p className="text-xs text-gray-400">
                      {formAnalytics.conversionRates.visitToStart.toFixed(1)}% conversion
                    </p>
                  </div>
                  <MousePointer className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Form Abandons</p>
                    <p className="text-3xl font-bold text-white">{formAnalytics.totalFormAbandons}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Form Submits</p>
                    <p className="text-3xl font-bold text-white">{formAnalytics.totalFormSubmits}</p>
                    <p className="text-xs text-gray-400">
                      {formAnalytics.conversionRates.overallConversion.toFixed(1)}% conversion
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Conversion Funnel</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <span className="text-white">Page Visits</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-white font-bold">{formAnalytics.totalPageVisits}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <span className="text-white">Form Starts</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: `${formAnalytics.conversionRates.visitToStart}%` }}></div>
                    </div>
                    <span className="text-white font-bold">{formAnalytics.totalFormStarts}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <span className="text-white">Form Submits</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full" style={{ width: `${formAnalytics.conversionRates.overallConversion}%` }}></div>
                    </div>
                    <span className="text-white font-bold">{formAnalytics.totalFormSubmits}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Interaction Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Field Interactions</h3>
                <div className="space-y-3">
                  {Object.entries(formAnalytics.fieldInteractions).map(([field, count]) => (
                    <div key={field} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <span className="text-white capitalize">{field}</span>
                      <span className="text-pink-400 font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Abandonment Points</h3>
                <div className="space-y-3">
                  {Object.entries(formAnalytics.abandonmentPoints).map(([point, count]) => (
                    <div key={point} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <span className="text-white">{point.replace('after', 'After ')}</span>
                      <span className="text-yellow-400 font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* App Selection Analytics */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">App Selection Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formAnalytics.appSelectionAnalytics).map(([app, count]) => (
                  <div key={app} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">{app}</h4>
                    <p className="text-cyan-400 font-bold text-xl">{count} selections</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Interactions */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Interactions</h3>
              <div className="space-y-3">
                {formAnalytics.recentInteractions.slice(0, 10).map((interaction, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {interaction.event_type.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white text-sm">{interaction.event_type.replace('_', ' ')}</p>
                        {interaction.field_name && (
                          <p className="text-gray-300 text-xs">Field: {interaction.field_name}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {new Date(interaction.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Invite Tab */}
        {activeTab === 'invite' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-poppins font-bold text-white mb-6">
                Send App Invites
              </h2>

              <div className="space-y-6">
                {/* App Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Select App
                  </label>
                  <select
                    value={inviteForm.selectedApp}
                    onChange={(e) => {
                      setInviteForm(prev => ({ 
                        ...prev, 
                        selectedApp: e.target.value,
                        selectedUsers: []
                      }));
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="" className="bg-gray-800">Select an app</option>
                    {availableApps.map((app) => (
                      <option key={app} value={app} className="bg-gray-800">
                        {app} ({stats.appBreakdown[app]} signups)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Invite Link */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Invite Link
                  </label>
                  <input
                    type="url"
                    value={inviteForm.inviteLink}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, inviteLink: e.target.value }))}
                    placeholder="https://app.kosmicapps.com/invite/..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* User Selection */}
                {inviteForm.selectedApp && (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Select Users ({getUsersWithoutEmails(inviteForm.selectedApp).length} available)
                    </label>
                    <div className="bg-white/5 rounded-xl p-4 max-h-60 overflow-y-auto">
                      <div className="space-y-2">
                        {getUsersWithoutEmails(inviteForm.selectedApp).map((user) => (
                          <label key={user.id} className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              checked={inviteForm.selectedUsers.includes(user.email)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setInviteForm(prev => ({
                                    ...prev,
                                    selectedUsers: [...prev.selectedUsers, user.email]
                                  }));
                                } else {
                                  setInviteForm(prev => ({
                                    ...prev,
                                    selectedUsers: prev.selectedUsers.filter(email => email !== user.email)
                                  }));
                                }
                              }}
                              className="w-4 h-4 text-pink-500 bg-transparent border-white/30 rounded focus:ring-pink-500"
                            />
                            <div className="flex-1">
                              <p className="text-white text-sm">{user.name}</p>
                              <p className="text-gray-300 text-xs">{user.email}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Send Button */}
                <button
                  onClick={handleSendInvites}
                  disabled={isSendingInvites || inviteForm.selectedUsers.length === 0}
                  className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSendingInvites ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Invites...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send {inviteForm.selectedUsers.length} Invites</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
