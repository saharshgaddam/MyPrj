import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Upload, Image, FileText, Microscope, Fingerprint, Trash2, Camera,
  BarChart3, Eye, Share, Settings, UploadCloud, Plus, ChevronRight, MessageSquare,
  Book, Scroll, LayoutGrid, Info, FileUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Case() {
  const { caseId } = useParams();
  const [caseName, setCaseName] = useState(`Case #${caseId?.replace("case-", "")}`);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("sources");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result.toString());
            
            if (newImages.length === files.length) {
              setUploadedImages([...uploadedImages, ...newImages]);
              toast({
                title: "Upload Successful",
                description: `Uploaded ${files.length} image${files.length !== 1 ? "s" : ""}.`,
              });
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Only image files are supported at this time.",
          variant: "destructive",
        });
      }
    });
    
    e.target.value = "";
  };

  const handleDeleteImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    
    toast({
      title: "Image Deleted",
      description: "The image has been removed from your case.",
    });
    
    if (selectedImage === uploadedImages[index]) {
      setSelectedImage(null);
    }
  };

  const analyzeEvidence = () => {
    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "Your evidence is being analyzed. This may take a moment.",
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      if (!isMobile) {
        setActiveTab("studio");
      }
      toast({
        title: "Analysis Complete",
        description: "Your evidence has been analyzed. View the results in the Studio tab.",
      });
    }, 2000);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        // Header components continue here...
        {/* ...rest of the JSX... */}
      </header>
      {/* Main content and other components */}
      {/* Rest of the JSX code that follows, such as the main content area, would continue in the same pattern... */}
    </div>
  );
}

// Example of converting a component with props to JS. If not used, remove it.
function Customize({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2H2v10h10V2z" />
      <path d="M22 12h-10v10h10V12z" />
      <path d="M12 12H2v10h10V12z" />
      <path d="M22 2h-10v10h10V2z" />
    </svg>
  );
}
