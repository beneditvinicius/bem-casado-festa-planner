
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/products';
import { Key } from 'lucide-react';

const PasswordManagement: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const adminPassword = useProductsStore(state => state.adminPassword);
  const setAdminPassword = useProductsStore(state => state.setAdminPassword);
  const { toast } = useToast();
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPassword !== adminPassword) {
      toast({
        title: "Senha atual incorreta",
        description: "A senha atual informada está incorreta.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A nova senha e a confirmação precisam ser iguais.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 4) {
      toast({
        title: "Senha muito curta",
        description: "A nova senha deve ter pelo menos 4 caracteres.",
        variant: "destructive"
      });
      return;
    }
    
    setAdminPassword(newPassword);
    
    toast({
      title: "Senha alterada com sucesso",
      description: "Sua senha de administrador foi alterada."
    });
    
    // Reset the form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5 text-[#eb6824]" />
          Alterar Senha do Administrador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-full"
            />
          </div>
          
          <div>
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input 
              id="new-password" 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-full"
            />
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input 
              id="confirm-password" 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            Alterar Senha
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordManagement;
