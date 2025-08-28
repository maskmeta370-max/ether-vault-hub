import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Upload, File, Lock, Unlock, X, Check } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessPrice, setAccessPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      
      toast({
        title: "Upload successful!",
        description: `${selectedFiles.length} file(s) uploaded to IPFS successfully.`,
        variant: "default"
      });

      // Reset form
      setSelectedFiles([]);
      setDescription("");
      setAccessPrice("");
      setIsPrivate(false);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      clearInterval(interval);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Files</h1>
          <p className="text-muted-foreground">
            Upload your files to the decentralized IPFS network with client-side encryption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Files</CardTitle>
                <CardDescription>
                  Choose files to upload or drag and drop them here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Support for all file types. Max file size: 100MB
                  </p>
                  <Button variant="outline">
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-4">Selected Files ({selectedFiles.length})</h4>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center space-x-3">
                            <File className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Settings</CardTitle>
                <CardDescription>
                  Configure privacy and access settings for your files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center space-x-2">
                      {isPrivate ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      <span>Private File</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isPrivate ? "File requires token payment to access" : "File is publicly accessible"}
                    </p>
                  </div>
                  <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                </div>

                {isPrivate && (
                  <div className="space-y-2">
                    <Label htmlFor="accessPrice">Access Price (DST Tokens)</Label>
                    <Input
                      id="accessPrice"
                      type="number"
                      placeholder="10"
                      value={accessPrice}
                      onChange={(e) => setAccessPrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Users will pay this amount to access your file
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a description for your files..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Files selected:</span>
                  <span className="font-medium">{selectedFiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total size:</span>
                  <span className="font-medium">
                    {formatFileSize(selectedFiles.reduce((total, file) => total + file.size, 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Privacy:</span>
                  <span className="font-medium">{isPrivate ? "Private" : "Public"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Encryption:</span>
                  <span className="font-medium text-success">AES-256</span>
                </div>
              </CardContent>
            </Card>

            {isUploading && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {uploadProgress < 100 ? `Uploading... ${Math.round(uploadProgress)}%` : "Upload Complete!"}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button 
              variant="hero" 
              className="w-full" 
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
            >
              {isUploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Start Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}