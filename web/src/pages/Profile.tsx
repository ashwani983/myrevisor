import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Target, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useSettingsStore } from '@/stores/settingsStore';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { userName, setUserName, targetRole, setTargetRole } =
    useSettingsStore();

  const [name, setName] = useState(userName);
  const [role, setRole] = useState(targetRole);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setUserName(name.trim());
    setTargetRole(role.trim());

    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile saved successfully!');
    }, 500);
  };

  const hasChanges = name !== userName || role !== targetRole;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Customize your learning experience
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This will be shown on your dashboard greeting
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Role
                </label>
                <Input
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g., DevOps Engineer, SRE, Cloud Engineer"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Helps us suggest relevant topics to study
                </p>
              </div>

              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="w-full mt-4"
              >
                {isSaving ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Career Goals
              </CardTitle>
              <CardDescription>
                Your target roles and aspirations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {role ? (
                <div className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Targeting
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {role}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No target role set yet</p>
                  <p className="text-sm mt-1">
                    Add your target role to get personalized suggestions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
