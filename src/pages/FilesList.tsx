import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Share2, 
  Trash2, 
  Eye, 
  Lock, 
  Unlock,
  File,
  Image,
  FileText,
  Archive
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function FilesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data
  const files = [
    {
      id: "1",
      name: "Project_Proposal.pdf",
      type: "document",
      size: "2.4 MB",
      uploaded: "2 hours ago",
      privacy: "private",
      cid: "QmX7Hg2Q3kF9mN8L5vB7yC4wE6rT8uI1oP2aS3dF4gH5jK6l",
      downloads: 12,
      earnings: "45 DST"
    },
    {
      id: "2", 
      name: "Design_Assets.zip",
      type: "archive",
      size: "15.7 MB",
      uploaded: "1 day ago",
      privacy: "public",
      cid: "QmY8Ig3R4lG0nO9M6wC8zD5xF7sU2jP3bT4eG5hI6kL7mN8o",
      downloads: 89,
      earnings: "0 DST"
    },
    {
      id: "3",
      name: "Database_Backup.sql",
      type: "document", 
      size: "45.2 MB",
      uploaded: "3 days ago",
      privacy: "private",
      cid: "QmZ9Jh4S5mH1oP0N7xD9aE6yG8tV3kQ4cU5fH6iJ7lM8nO9p",
      downloads: 3,
      earnings: "120 DST"
    },
    {
      id: "4",
      name: "App_Screenshots.zip", 
      type: "image",
      size: "8.1 MB",
      uploaded: "1 week ago",
      privacy: "public",
      cid: "QmA0Ki5T6nI2pQ1O8yE0bF7zH9uW4lR5dV6gI7jK8mN9oP0q",
      downloads: 156,
      earnings: "0 DST"
    },
    {
      id: "5",
      name: "Contract_Draft.docx",
      type: "document",
      size: "1.2 MB", 
      uploaded: "2 weeks ago",
      privacy: "private",
      cid: "QmB1Lj6U7oJ3qR2P9zF1cG8aI0xX5mS6eW7hJ8kL9nO0pQ1r",
      downloads: 7,
      earnings: "28 DST"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "document": return <FileText className="h-4 w-4" />;
      case "archive": return <Archive className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || file.privacy === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Files</h1>
          <p className="text-muted-foreground">
            Manage and access all your files stored on the decentralized network.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>File Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter: {filterType === "all" ? "All Files" : filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType("all")}>
                    All Files
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("public")}>
                    Public Files
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("private")}>
                    Private Files
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="hero" asChild>
                <Link to="/upload">Upload New File</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Files Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Privacy</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {file.cid.substring(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={file.privacy === "private" ? "default" : "secondary"}
                        className="flex items-center w-fit"
                      >
                        {file.privacy === "private" ? (
                          <Lock className="h-3 w-3 mr-1" />
                        ) : (
                          <Unlock className="h-3 w-3 mr-1" />
                        )}
                        {file.privacy}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{file.uploaded}</TableCell>
                    <TableCell>{file.downloads}</TableCell>
                    <TableCell className="text-success font-medium">{file.earnings}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/files/${file.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredFiles.length === 0 && (
          <Card className="mt-6">
            <CardContent className="text-center py-12">
              <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search criteria." : "Upload your first file to get started."}
              </p>
              <Button variant="hero" asChild>
                <Link to="/upload">Upload File</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </div>
  );
}