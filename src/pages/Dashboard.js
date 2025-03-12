import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Fingerprint, FolderPlus, Search, FileText, Clock, Filter, ArrowUp, ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sampleCases = [
  {
    id: "case-001",
    title: "Downtown Robbery Investigation",
    date: "2023-09-15",
    status: "In Progress",
    type: "Robbery",
    lastUpdated: "2023-09-20",
  },
  {
    id: "case-002",
    title: "Westside Home Invasion",
    date: "2023-08-22",
    status: "Completed",
    type: "Burglary",
    lastUpdated: "2023-09-01",
  },
  {
    id: "case-003",
    title: "River Park Homicide",
    date: "2023-07-30",
    status: "In Progress",
    type: "Homicide",
    lastUpdated: "2023-09-18",
  },
];

function Dashboard() {
  const [cases, setCases] = useState(sampleCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseType, setNewCaseType] = useState("");
  const [sortField, setSortField] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCases = cases.filter(
    c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleCreateCase = () => {
    if (!newCaseTitle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a title for the case.",
      });
      return;
    }

    const newCase = {
      id: `case-${String(cases.length + 1).padStart(3, "0")}`,
      title: newCaseTitle,
      date: new Date().toISOString().split("T")[0],
      status: "New",
      type: newCaseType || "Unspecified",
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCases([newCase, ...cases]);
    setNewCaseTitle("");
    setNewCaseType("");
    setIsDialogOpen(false);

    toast({
      title: "Case Created",
      description: "Your new case has been created successfully.",
    });
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Case Dashboard</h1>
            <p className="text-muted-foreground">Manage your forensic investigation cases</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cases..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Dropdown and Dialog Components */}
            </div>
          </div>
          {/* Sorting, Dialog, and Case Listing components */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default Dashboard;
