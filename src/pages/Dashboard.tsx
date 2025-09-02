import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Upload, Files, Wallet, User, HardDrive, Coins, Activity, Plus } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Storage Used",
      value: "2.4 GB",
      description: "of 100 GB available",
      icon: HardDrive,
      color: "text-info"
    },
    {
      title: "DST Balance",
      value: "1,247",
      description: "tokens earned",
      icon: Coins,
      color: "text-success"
    },
    {
      title: "Files Stored",
      value: "156",
      description: "across the network",
      icon: Files,
      color: "text-accent"
    },
    {
      title: "Network Activity",
      value: "98.7%",
      description: "uptime this month",
      icon: Activity,
      color: "text-warning"
    }
  ];

  const recentFiles = [
    { name: "Project_Proposal.pdf", size: "2.4 MB", uploaded: "2 hours ago", cid: "QmX..." },
    { name: "Design_Assets.zip", size: "15.7 MB", uploaded: "1 day ago", cid: "QmY..." },
    { name: "Database_Backup.sql", size: "45.2 MB", uploaded: "3 days ago", cid: "QmZ..." },
    { name: "App_Screenshots.zip", size: "8.1 MB", uploaded: "1 week ago", cid: "QmA..." },
    { name: "Contract_Draft.docx", size: "1.2 MB", uploaded: "2 weeks ago", cid: "QmB..." }
  ];

  const quickActions = [
    {
      title: "Upload Files",
      description: "Add new files to the network",
      icon: Upload,
      href: "/upload",
      variant: "hero" as const
    },
    {
      title: "Browse Files",
      description: "View and manage your files",
      icon: Files,
      href: "/files",
      variant: "outline" as const
    },
    {
      title: "Manage Wallet",
      description: "View tokens and transactions",
      icon: Wallet,
      href: "/wallet",
      variant: "outline" as const
    },
    {
      title: "Profile Settings",
      description: "Update your preferences",
      icon: User,
      href: "/profile",
      variant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Here's an overview of your decentralized storage activity.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-glow transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts for managing your files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-accent transition-smooth cursor-pointer">
                      <CardContent className="p-4">
                        <Button variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
                          <Link to={action.href} className="block">
                            <div className="flex items-center space-x-3">
                              <action.icon className="h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">{action.title}</div>
                                <div className="text-sm text-muted-foreground">{action.description}</div>
                              </div>
                            </div>
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Files */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Files</CardTitle>
                  <CardDescription>Your latest uploads</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/files">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size} • {file.uploaded}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0 ml-2">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}