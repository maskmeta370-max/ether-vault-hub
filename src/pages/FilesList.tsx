import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useFiles } from "@/hooks/useFiles";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Archive, 
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  Eye,
  Lock,
  Globe,
  Calendar,
  HardDrive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FilesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { files, deleteFile, getFileUrl } = useFiles();
  const { toast } = useToast();

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile.mutateAsync(fileId);
      toast({
        title: "File deleted",
        description: "The file has been successfully deleted."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete file. Please try again."
      });
    }
  };

  const handleDownload = async (fileName: string, originalName: string) => {
    try {
      const url = await getFileUrl(fileName);
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download file. Please try again."
      });
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf')) return FileText;
    if (type.includes('zip') || type.includes('rar')) return Archive;
    return FileText;
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || file.file_type.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Files</h1>
          <p className="text-muted-foreground text-lg">
            Manage and access all your files stored on the decentralized network.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>File Management</CardTitle>
            <CardDescription>Search, filter, and manage your stored files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Files</SelectItem>
                  <SelectItem value="pdf">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="zip">Archives</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => navigate("/upload")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Files Table */}
        {filteredFiles.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Privacy</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file.file_type);
                    return (
                      <TableRow key={file.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{file.original_name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{(file.file_size / (1024 * 1024)).toFixed(1)} MB</TableCell>
                        <TableCell>
                          <Badge 
                            variant={file.is_public ? 'default' : 'secondary'}
                            className="flex items-center gap-1 w-fit"
                          >
                            {file.is_public ? (
                              <>
                                <Globe className="h-3 w-3" />
                                Public
                              </>
                            ) : file.password_protected ? (
                              <>
                                <Eye className="h-3 w-3" />
                                Password
                              </>
                            ) : (
                              <>
                                <Lock className="h-3 w-3" />
                                Private
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(file.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{file.download_count}</TableCell>
                        <TableCell className="text-success font-medium">
                          {file.earnings_amount.toFixed(3)} DST
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDownload(file.name, file.original_name)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleDelete(file.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search criteria." : "Upload your first file to get started."}
              </p>
              <Button onClick={() => navigate("/upload")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}