import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download, 
  Share2, 
  Lock, 
  Unlock, 
  Copy, 
  Eye, 
  Trash2, 
  FileText,
  Calendar,
  HardDrive,
  Users,
  Shield,
  ExternalLink,
  Clock,
  Coins
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function FileDetails() {
  const { id } = useParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareRecipient, setShareRecipient] = useState("");
  const [shareDuration, setShareDuration] = useState("24");
  const { toast } = useToast();

  // Mock file data - in real app this would come from API
  const file = {
    id: "1",
    name: "Project_Proposal.pdf",
    type: "document",
    size: "2.4 MB",
    uploaded: "2 hours ago",
    privacy: "private",
    cid: "QmX7Hg2Q3kF9mN8L5vB7yC4wE6rT8uI1oP2aS3dF4gH5jK6l",
    downloads: 12,
    earnings: "45 DST",
    accessPrice: "10 DST",
    description: "Comprehensive project proposal for Q2 initiatives including technical specifications and budget breakdown.",
    owner: "0x742d35Cc6123456789ABCDEFabcdef1234567890",
    versions: [
      { version: "1.0", cid: "QmX7Hg2Q3kF9mN8L5vB7yC4wE6rT8uI1oP2aS3dF4gH5jK6l", timestamp: "2 hours ago", size: "2.4 MB" },
      { version: "0.9", cid: "QmY8Ig3R4lG0nO9M6wC8zD5xF7sU2jP3bT4eG5hI6kL7mN8o", timestamp: "1 day ago", size: "2.1 MB" },
      { version: "0.8", cid: "QmZ9Jh4S5mH1oP0N7xD9aE6yG8tV3kQ4cU5fH6iJ7lM8nO9p", timestamp: "3 days ago", size: "1.9 MB" }
    ],
    accessTokens: [
      { recipient: "0xABC...123", expires: "2024-01-15", used: true },
      { recipient: "0xDEF...456", expires: "2024-01-20", used: false }
    ]
  };

  const copyCID = () => {
    navigator.clipboard.writeText(file.cid);
    toast({
      title: "CID copied",
      description: "File CID copied to clipboard",
    });
  };

  const generateShareToken = () => {
    // Mock share token generation
    const token = "DST_" + Math.random().toString(36).substring(2, 15);
    navigator.clipboard.writeText(`https://decstore.app/access/${token}`);
    setShowShareModal(false);
    toast({
      title: "Share link generated",
      description: "Access link copied to clipboard",
    });
  };

  const downloadFile = () => {
    toast({
      title: "Download started",
      description: "File download has begun",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link to="/files" className="hover:text-foreground">Files</Link>
              <span>/</span>
              <span>{file.name}</span>
            </div>
            <h1 className="text-3xl font-bold">{file.name}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>File Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/50 border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">PDF Document</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Preview not available for this file type
                    </p>
                    <Button variant="outline" onClick={downloadFile}>
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* File Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>File Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-medium">{file.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upload Date</p>
                      <p className="font-medium">{file.uploaded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Privacy</p>
                      <Badge variant={file.privacy === "private" ? "default" : "secondary"} className="w-fit">
                        {file.privacy === "private" ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                        {file.privacy}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Downloads</p>
                      <p className="font-medium">{file.downloads}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">IPFS CID</p>
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                      <code className="font-mono text-sm flex-1">{file.cid}</code>
                      <Button variant="ghost" size="sm" onClick={copyCID}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={file.description}
                      readOnly
                      className="mt-2 min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Version History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Version History</span>
                  </CardTitle>
                  <CardDescription>Previous versions of this file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {file.versions.map((version, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium">Version {version.version}</p>
                          <p className="text-sm text-muted-foreground">
                            {version.timestamp} • {version.size}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {index > 0 && (
                            <Button variant="outline" size="sm">
                              Revert
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="hero" className="w-full" onClick={downloadFile}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowShareModal(true)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Access
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View in IPFS
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete File
                  </Button>
                </CardContent>
              </Card>

              {/* Earnings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-success" />
                    <span>Earnings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{file.earnings}</p>
                    <p className="text-sm text-muted-foreground">Total earned from this file</p>
                  </div>
                  {file.privacy === "private" && (
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Access Price</p>
                      <p className="font-medium">{file.accessPrice}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Access Tokens */}
              {file.privacy === "private" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Access Tokens</span>
                    </CardTitle>
                    <CardDescription>Generated access tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {file.accessTokens.map((token, index) => (
                        <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-mono text-sm">{token.recipient}</p>
                            <Badge variant={token.used ? "secondary" : "default"}>
                              {token.used ? "Used" : "Active"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Expires: {token.expires}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Share File Access</CardTitle>
                  <CardDescription>Generate a temporary access token</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={shareRecipient}
                      onChange={(e) => setShareRecipient(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={shareDuration}
                      onChange={(e) => setShareDuration(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowShareModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="hero" className="flex-1" onClick={generateShareToken}>
                      Generate Token
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}