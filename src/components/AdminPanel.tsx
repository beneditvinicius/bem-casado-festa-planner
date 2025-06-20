
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminSection from './admin/AdminSection';

const AdminPanel = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#eb6824] mx-auto"></div>
          <p className="mt-2">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <Button 
          onClick={signOut}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Sair
        </Button>
      </div>
      <AdminSection />
    </div>
  );
};

export default AdminPanel;
