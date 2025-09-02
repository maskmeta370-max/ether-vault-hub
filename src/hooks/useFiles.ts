import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface FileRecord {
  id: string;
  user_id: string;
  name: string;
  original_name: string;
  file_type: string;
  file_size: number;
  ipfs_hash: string | null;
  is_public: boolean;
  password_protected: boolean;
  password_hash: string | null;
  download_count: number;
  earnings_amount: number;
  upload_status: 'uploading' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export const useFiles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: files = [], isLoading, error } = useQuery({
    queryKey: ['files', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as FileRecord[];
    },
    enabled: !!user,
  });

  const uploadFile = useMutation({
    mutationFn: async ({ 
      file, 
      isPublic = false, 
      passwordProtected = false 
    }: { 
      file: File; 
      isPublic?: boolean; 
      passwordProtected?: boolean; 
    }) => {
      if (!user) throw new Error('No user found');

      // Upload to storage first
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('files')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // Create database record
      const { data, error } = await supabase
        .from('files')
        .insert({
          user_id: user.id,
          name: fileName,
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          is_public: isPublic,
          password_protected: passwordProtected,
          upload_status: 'completed'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', user?.id] });
    },
  });

  const deleteFile = useMutation({
    mutationFn: async (fileId: string) => {
      if (!user) throw new Error('No user found');

      // Get file info first
      const { data: fileData, error: fileError } = await supabase
        .from('files')
        .select('name')
        .eq('id', fileId)
        .eq('user_id', user.id)
        .single();

      if (fileError) throw fileError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('files')
        .remove([fileData.name]);

      if (storageError) throw storageError;

      // Delete database record
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', user?.id] });
    },
  });

  const getFileUrl = async (fileName: string) => {
    const { data } = await supabase.storage
      .from('files')
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    return data?.signedUrl;
  };

  return {
    files,
    isLoading,
    error,
    uploadFile,
    deleteFile,
    getFileUrl,
  };
};