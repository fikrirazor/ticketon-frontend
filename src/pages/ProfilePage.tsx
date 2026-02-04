// src/pages/ProfilePage.tsx
import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/auth.store';
import { Button } from '../components/ui/button';
import { Camera, Save, X, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { getFullImageUrl } from '../lib/axiosInstance';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  React.useEffect(() => {
    const handleOpenEdit = () => setIsEditing(true);
    window.addEventListener('open-profile-edit', handleOpenEdit);
    return () => window.removeEventListener('open-profile-edit', handleOpenEdit);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (name !== user?.name) formData.append('name', name);
    if (email !== user?.email) formData.append('email', email);
    if (password) formData.append('password', password);
    if (selectedFile) formData.append('avatar', selectedFile);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setPassword('');
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword('');
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const getAvatarSource = () => {
    if (previewUrl) return previewUrl;
    if (user?.avatarUrl) {
      return getFullImageUrl(user.avatarUrl);
    }
    return null;
  };

  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-8 px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              className="animate-pulse-subtle shadow-orange-500/20 shadow-lg px-5 rounded-full text-xs font-semibold"
            >
              Update Profile
            </Button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg">
                    {getAvatarSource() ? (
                      <img src={getAvatarSource()!} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-16 h-16 text-slate-300" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">Click icon to change photo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="Min 8 characters"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={cancelEdit} disabled={isLoading}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-xl ring-1 ring-slate-100">
                  {getAvatarSource() ? (
                    <img src={getAvatarSource()!} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{user?.name}</h2>
                  <p className="text-slate-500 font-medium mb-3">{user?.email}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {user?.role}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Personal Information</span>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Email Address</p>
                    <p className="text-slate-900 font-bold">{user?.email}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account Status</span>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Verified Account</p>
                    <p className="text-emerald-600 font-bold flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;