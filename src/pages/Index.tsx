import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/pages/Dashboard";
import { CreateContent } from "@/pages/CreateContent";
import { ContentHistory } from "@/pages/ContentHistory";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'create':
        return <CreateContent onNavigate={setCurrentPage} />;
      case 'history':
        return <ContentHistory />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">Analytics</h2>
              <p className="text-muted-foreground">Em breve</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">Configurações</h2>
              <p className="text-muted-foreground">Em breve</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Glow effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-64">
        <Header />
        <div className="p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
