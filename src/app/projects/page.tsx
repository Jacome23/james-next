"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, Users, DollarSign, Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Modern online shopping platform with payment integration",
    status: "In Progress",
    priority: "High",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 75000,
    teamSize: 8,
    progress: 65,
    client: "TechCorp Inc.",
    manager: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Secure mobile application for banking services",
    status: "Completed",
    priority: "Critical",
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    budget: 120000,
    teamSize: 12,
    progress: 100,
    client: "First National Bank",
    manager: "Michael Chen",
  },
  {
    id: 3,
    name: "CRM Dashboard",
    description: "Customer relationship management system with analytics",
    status: "Planning",
    priority: "Medium",
    startDate: "2024-03-01",
    endDate: "2024-08-15",
    budget: 45000,
    teamSize: 5,
    progress: 15,
    client: "SalesForce Pro",
    manager: "Emily Rodriguez",
  },
  {
    id: 4,
    name: "Learning Management System",
    description: "Online education platform with video streaming",
    status: "In Progress",
    priority: "High",
    startDate: "2023-11-20",
    endDate: "2024-05-10",
    budget: 85000,
    teamSize: 10,
    progress: 78,
    client: "EduTech Solutions",
    manager: "David Kim",
  },
  {
    id: 5,
    name: "Inventory Management",
    description: "Warehouse inventory tracking and management system",
    status: "On Hold",
    priority: "Low",
    startDate: "2024-02-01",
    endDate: "2024-07-30",
    budget: 32000,
    teamSize: 4,
    progress: 25,
    client: "LogiCorp",
    manager: "Anna Thompson",
  },
  {
    id: 6,
    name: "Social Media Analytics",
    description: "Real-time social media monitoring and analytics tool",
    status: "In Progress",
    priority: "Medium",
    startDate: "2024-01-10",
    endDate: "2024-04-25",
    budget: 55000,
    teamSize: 6,
    progress: 42,
    client: "Digital Marketing Hub",
    manager: "James Wilson",
  },
  {
    id: 7,
    name: "Healthcare Portal",
    description: "Patient management system for healthcare providers",
    status: "Completed",
    priority: "Critical",
    startDate: "2023-08-15",
    endDate: "2024-01-20",
    budget: 95000,
    teamSize: 9,
    progress: 100,
    client: "MedCare Systems",
    manager: "Lisa Park",
  },
  {
    id: 8,
    name: "Food Delivery App",
    description: "Mobile app for restaurant food ordering and delivery",
    status: "Planning",
    priority: "High",
    startDate: "2024-04-01",
    endDate: "2024-09-15",
    budget: 68000,
    teamSize: 7,
    progress: 5,
    client: "QuickEats",
    manager: "Robert Martinez",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "In Progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Planning":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "On Hold":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "High":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "Medium":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}


interface InputWithButtonProps {
  placeholder?: string
  buttonText?: string
  buttonIcon?: React.ReactNode
  value?: string,
  onChange: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  buttonClick?:() => void,
  type?: "search" | "email" | "text"
  disabled?: boolean
  position?: "prepend" | "append"
}

function InputWithButton({
  placeholder = "Enter text...",
  buttonText = "Submit",
  buttonIcon,
  buttonClick,
  value,
  onChange,
  type = "text",
  disabled = false,
  position = "append",
}: InputWithButtonProps) {

  return (
    <div className="flex w-full max-w-sm items-center space-x-0">
      {position === "prepend" ? (
        <>
          <Button disabled={disabled} className="rounded-r-none border-r-0" onClick={buttonClick}>
            {buttonIcon && <span className="mr-1">{buttonIcon}</span>}
            {buttonText}
          </Button>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="rounded-l-none border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </>
      ) : (
        <>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button disabled={disabled} className="rounded-l-none border-l-0" onClick={buttonClick}>
            {buttonIcon && <span className="mr-1">{buttonIcon}</span>}
            {buttonText}
          </Button>
        </>
      )}
    </div>
  )
}


export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        </div>
        <div className="flex items-center space-x-2">
          <InputWithButton
            placeholder="Search for anything..."
            buttonText="Add Project"
            buttonIcon={<Plus className="h-4 w-4" />}
            value={searchTerm}
            onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setSearchTerm(e.target.value)}
            type="search"
            position="prepend"
            buttonClick={()=>console.log('test')}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.status === "In Progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.teamSize, 0)}</div>
            <p className="text-xs text-muted-foreground">Total team size</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects
                .filter(
                  (project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.client.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>${project.budget.toLocaleString()}</TableCell>
                    <TableCell>{project.teamSize}</TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Team</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
