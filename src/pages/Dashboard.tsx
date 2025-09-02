import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useFiles } from "@/hooks/useFiles";
import { 
  Upload, 
  FolderOpen, 
  Wallet, 
  User, 
  HardDrive, 
  Coins, 
  FileText, 
  Activity,
  Download,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { files } = useFiles();

  // Calculate stats from real data
  const totalStorageGB = profile ? (profile.total_storage_used / (1024 * 1024 * 1024)).toFixed(1) : '0';
  const publicFilesCount = files.filter(f => f.is_public).length;
  const privateFilesCount = files.filter(f => !f.is_public).length;
  const totalEarnings = files.reduce((sum, f) => sum + f.earnings_amount, 0);
  
  const stats = [
    {
      title: "Storage Used",
      value: `${totalStorageGB} GB`,
      description: "of unlimited",
      icon: HardDrive,
      color: "text-primary"
    },
    {
      title: "Token Balance", 
      value: `${profile?.token_balance?.toFixed(2) || '0.00'} DST`,
      description: `+${totalEarnings.toFixed(2)} earned`,
      icon: Coins,
      color: "text-accent"
    },
    {
      title: "Files Stored",
      value: files.length.toString(),
      description: `${publicFilesCount} public, ${privateFilesCount} private`, 
      icon: FileText,
      color: "text-success"
    },
    {
      title: "Network Activity",
      value: "Active",
      description: "Connected to IPFS network",
      icon: Activity,
      color: "text-info"
    }
  ];

  const recentFiles = files.slice(0, 3).map(file => ({
    name: file.original_name,
    size: `${(file.file_size / (1024 * 1024)).toFixed(1)} MB`,
    time: new Date(file.created_at).toLocaleDateString()
  }));

  const quickActions = [
    {
      title: "Upload Files",
      description: "Add new files to the decentralized network",
      icon: Upload,
      onClick: () => navigate("/upload")
    },
    {
      title: "Browse Files", 
      description: "View and manage your stored files",
      icon: FolderOpen,
      onClick: () => navigate("/files")
    },
    {
      title: "Manage Wallet",
      description: "View DST tokens and earnings",
      icon: Wallet,
      onClick: () => navigate("/wallet")
    },
    {
      title: "Profile Settings",
      description: "Update account and preferences", 
      icon: User,
      onClick: () => navigate("/profile")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}!</h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your decentralized storage.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-glow transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
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
                  Fast access to common file management tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-accent transition-smooth cursor-pointer" onClick={action.onClick}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-gradient-primary rounded-lg">
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
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
                <Button variant="ghost" size="sm" onClick={() => navigate("/files")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {recentFiles.length > 0 ? (
                  <div className="space-y-4">
                    {recentFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size} • {file.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="shrink-0 ml-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No files uploaded yet</p>
                    <Button variant="outline" size="sm" onClick={() => navigate("/upload")}>
                      Upload First File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}