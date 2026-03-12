import { useState } from 'react';
import { useToastStore } from "@/store/toastStore";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastStore();

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText?.(text);
    setCopied(true);
    showToast("Скопировано в буфер обмена", "success");
    
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;