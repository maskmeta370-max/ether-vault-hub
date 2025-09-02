import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { useFiles } from "@/hooks/useFiles";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Upload as UploadIcon, 
  File, 
  X, 
  Lock, 
  Globe, 
  Eye,
  CheckCircle
} from "lucide-react";

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadFile } = useFiles();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select at least one file to upload."
      });
      return;
    }

    if (passwordProtected && !password) {
      toast({
        variant: "destructive", 
        title: "Password required",
        description: "Please enter a password for protected files."
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploadProgress(((i + 1) / selectedFiles.length) * 100);
        
        await uploadFile.mutateAsync({
          file,
          isPublic,
          passwordProtected
        });
      }

      toast({
        title: "Upload successful!",
        description: `${selectedFiles.length} file(s) uploaded successfully.`
      });

      // Reset form
      setSelectedFiles([]);
      setIsPublic(false);
      setPasswordProtected(false);
      setPassword('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Navigate to files page
      setTimeout(() => navigate('/files'), 1000);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again."
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Upload Files</h1>
            <p className="text-muted-foreground text-lg">
              Upload your files to the decentralized storage network
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Select files to upload and configure privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Drop Zone */}
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                <p className="text-muted-foreground">
                  Support for multiple files. Max 100MB per file.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Files ({selectedFiles.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <File className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          disabled={uploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              <div className="space-y-4">
                <Label>Privacy Settings</Label>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={isPublic}
                      onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                      disabled={uploading}
                    />
                    <Label htmlFor="public" className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Make files public</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="password"
                      checked={passwordProtected}
                      onCheckedChange={(checked) => setPasswordProtected(checked as boolean)}
                      disabled={uploading || isPublic}
                    />
                    <Label htmlFor="password" className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>Password protect files</span>
                    </Label>
                  </div>

                  {!isPublic && !passwordProtected && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">Files will be private (only you can access)</span>
                    </div>
                  )}
                </div>

                {passwordProtected && !isPublic && (
                  <div className="space-y-2">
                    <Label htmlFor="filePassword">File Password</Label>
                    <Input
                      id="filePassword"
                      type="password"
                      placeholder="Enter password for protected files"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={uploading}
                    />
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Upload Progress</Label>
                    <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
                className="w-full"
              >
                {uploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UploadIcon className="h-4 w-4" />
                    <span>Upload {selectedFiles.length > 0 ? `${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}` : 'Files'}</span>
                  </div>
                )}
              </Button>

              {uploadProgress === 100 && !uploading && (
                <div className="flex items-center justify-center space-x-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span>Upload completed successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}