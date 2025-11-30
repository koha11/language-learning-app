import { useToast } from './useToast';

export const useCopyToClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copy to clipboard');
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };
  return { copyToClipboard };
};
