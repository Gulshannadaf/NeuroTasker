"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Bell,
  Bot,
  CheckCircle2,
  Clock,
  FolderOpen,
  Home,
  ListTodo,
  Plus,
  Search,
  Settings,
  Sparkles,
  Zap,
  Edit,
  Trash2,
  CalendarIcon,
  Repeat,
  Download,
  Users,
  Moon,
  Sun,
  X,
  Target,
  Activity,
  FileText,
  Filter,
  SortAsc,
  Archive,
  AlertCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function Component() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [editingAgent, setEditingAgent] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [commandOpen, setCommandOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [draggedTask, setDraggedTask] = useState(null)

  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Task Completed",
      message: "Research Assistant completed 'Database optimization'",
      time: "2 minutes ago",
      read: false,
      type: "success",
    },
    {
      id: 2,
      title: "New Agent Added",
      message: "Content Creator was added to your team",
      time: "15 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: 3,
      title: "Task Overdue",
      message: "Design new landing page is past due date",
      time: "1 hour ago",
      read: true,
      type: "warning",
    },
  ])

  const [agents, setAgents] = useState([])
  const [projects, setProjects] = useState([])

  // Add mock agents as fallback
  const mockAgents = [
    {
      id: 1,
      name: "Research Assistant",
      role: "Data Analysis & Research",
      status: "active",
      tasksCompleted: 24,
      avatar: "RA",
      recentActivity: [
        { task: "Database optimization", action: "completed", time: "2 hours ago" },
        { task: "User feedback analysis", action: "started", time: "1 day ago" },
      ],
    },
    {
      id: 2,
      name: "Content Creator",
      role: "Writing & Content Generation",
      status: "active",
      tasksCompleted: 18,
      avatar: "CC",
      recentActivity: [
        { task: "Marketing content", action: "in progress", time: "30 minutes ago" },
        { task: "Blog post draft", action: "completed", time: "2 days ago" },
      ],
    },
    {
      id: 3,
      name: "Project Manager",
      role: "Task Organization & Planning",
      status: "idle",
      tasksCompleted: 31,
      avatar: "PM",
      recentActivity: [
        { task: "User authentication", action: "assigned", time: "1 hour ago" },
        { task: "Project planning", action: "completed", time: "3 days ago" },
      ],
    },
  ]

  // Mock projects
  const mockProjects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website",
      deadline: new Date("2024-02-15"),
      progress: 65,
      taskCount: 12,
      completedTasks: 8,
      status: "active",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native iOS and Android app",
      deadline: new Date("2024-03-30"),
      progress: 30,
      taskCount: 20,
      completedTasks: 6,
      status: "active",
    },
    {
      id: 3,
      title: "Marketing Campaign",
      description: "Q1 2024 marketing initiatives",
      deadline: new Date("2024-01-31"),
      progress: 90,
      taskCount: 8,
      completedTasks: 7,
      status: "active",
    },
  ]

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  })

  // Add mock data as fallback
  const mockTasks = [
    {
      id: 1,
      title: "Design new landing page",
      description: "Create wireframes and mockups for the new product landing page",
      priority: "high",
      status: "todo",
      agent: "Content Creator",
      dueDate: new Date("2024-01-20"),
      projectId: 1,
      recurring: { enabled: false, interval: "none" },
      subtasks: [
        { id: 1, title: "Create wireframes", completed: true },
        { id: 2, title: "Design mockups", completed: false },
        { id: 3, title: "Get stakeholder approval", completed: false },
      ],
    },
    {
      id: 2,
      title: "Research competitor analysis",
      description: "Analyze top 5 competitors in the AI task management space",
      priority: "medium",
      status: "todo",
      agent: "Research Assistant",
      dueDate: new Date("2024-01-22"),
      projectId: 2,
      recurring: { enabled: true, interval: "weekly" },
      subtasks: [
        { id: 1, title: "Identify competitors", completed: true },
        { id: 2, title: "Analyze features", completed: false },
        { id: 3, title: "Create comparison report", completed: false },
      ],
    },
    {
      id: 3,
      title: "Implement user authentication",
      description: "Set up OAuth integration with Google and GitHub",
      priority: "high",
      status: "in-progress",
      agent: "Project Manager",
      dueDate: new Date("2024-01-18"),
      projectId: 1,
      recurring: { enabled: false, interval: "none" },
      subtasks: [
        { id: 1, title: "Set up OAuth providers", completed: true },
        { id: 2, title: "Implement login flow", completed: true },
        { id: 3, title: "Add error handling", completed: false },
        { id: 4, title: "Write tests", completed: false },
      ],
    },
    {
      id: 4,
      title: "Create marketing content",
      description: "Write blog posts about AI productivity features",
      priority: "medium",
      status: "in-progress",
      agent: "Content Creator",
      dueDate: new Date("2024-01-25"),
      projectId: 3,
      recurring: { enabled: false, interval: "none" },
      subtasks: [
        { id: 1, title: "Research topics", completed: true },
        { id: 2, title: "Write first draft", completed: false },
        { id: 3, title: "Review and edit", completed: false },
      ],
    },
    {
      id: 5,
      title: "Database optimization",
      description: "Improved query performance by 40%",
      priority: "high",
      status: "completed",
      agent: "Research Assistant",
      completedDate: new Date("2024-01-15"),
      projectId: 1,
      recurring: { enabled: false, interval: "none" },
      subtasks: [
        { id: 1, title: "Analyze slow queries", completed: true },
        { id: 2, title: "Optimize indexes", completed: true },
        { id: 3, title: "Test performance", completed: true },
      ],
    },
  ]

  // Add loading state
  const [isLoading, setIsLoading] = useState(false)
  const [apiConnected, setApiConnected] = useState(false)

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/tasks")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const categorized = {
        todo: data.filter((t) => t.status === "todo"),
        inProgress: data.filter((t) => t.status === "in-progress"),
        completed: data.filter((t) => t.status === "completed"),
      }
      setTasks(categorized)
      setApiConnected(true)
      console.log("✅ Connected to API successfully")
    } catch (err) {
      console.warn("⚠️ API not available, using mock data:", err.message)
      // Use mock data as fallback
      const categorized = {
        todo: mockTasks.filter((t) => t.status === "todo"),
        inProgress: mockTasks.filter((t) => t.status === "in-progress"),
        completed: mockTasks.filter((t) => t.status === "completed"),
      }
      setTasks(categorized)
      setApiConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAgents = async () => {
    try {
      const response = await fetch("http://localhost:8000/agents")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAgents(data)
      console.log("✅ Agents loaded from API successfully")
    } catch (err) {
      console.warn("⚠️ Agents API not available, using mock data:", err.message)
      setAgents(mockAgents)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/projects")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.warn("⚠️ Projects API not available, using mock data:", err.message)
      setProjects(mockProjects)
    }
  }

  useEffect(() => {
    fetchTasks()
    fetchAgents()
    fetchProjects()
  }, [])

  // Keyboard shortcut for command palette
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    agent: "",
    dueDate: null,
    projectId: "",
    recurring: { enabled: false, interval: "none" },
    subtasks: [],
  })

  const [newAgent, setNewAgent] = useState({
    name: "",
    role: "",
    status: "active",
    avatar: "",
  })

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    deadline: null,
    status: "active",
  })

  // Task management functions
  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      })
      return
    }

    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      subtasks: newTask.subtasks.map((st, index) => ({ ...st, id: index + 1 })),
    }

    addTaskLocally(taskToAdd)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      agent: "",
      dueDate: null,
      projectId: "",
      recurring: { enabled: false, interval: "none" },
      subtasks: [],
    })
    setIsAddTaskOpen(false)

    toast({
      title: "Success",
      description: "Task added successfully",
    })
  }

  const handleEditTask = async () => {
    if (!editingTask.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      })
      return
    }

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks }
      Object.keys(newTasks).forEach((status) => {
        newTasks[status] = newTasks[status].map((task) => (task.id === editingTask.id ? editingTask : task))
      })
      return newTasks
    })

    setEditingTask(null)
    toast({
      title: "Success",
      description: "Task updated successfully",
    })
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks }
      Object.keys(newTasks).forEach((status) => {
        newTasks[status] = newTasks[status].filter((task) => task.id !== taskId)
      })
      return newTasks
    })

    toast({
      title: "Success",
      description: "Task deleted successfully",
    })
  }

  // Add helper function for local task management
  const addTaskLocally = (task) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks }
      if (task.status === "todo") {
        newTasks.todo = [...newTasks.todo, task]
      } else if (task.status === "in-progress") {
        newTasks.inProgress = [...newTasks.inProgress, task]
      } else if (task.status === "completed") {
        newTasks.completed = [...newTasks.completed, task]
      }
      return newTasks
    })
    console.log("✅ Task added locally:", task.title)
  }

  // Drag and drop functions
  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    if (!draggedTask) return

    const statusMap = {
      todo: "todo",
      "in-progress": "inProgress",
      completed: "completed",
    }

    const oldStatusKey = statusMap[draggedTask.status]
    const newStatusKey = statusMap[newStatus]

    if (oldStatusKey === newStatusKey) return

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks }
      // Remove from old status
      newTasks[oldStatusKey] = newTasks[oldStatusKey].filter((task) => task.id !== draggedTask.id)
      // Add to new status
      const updatedTask = { ...draggedTask, status: newStatus }
      newTasks[newStatusKey] = [...newTasks[newStatusKey], updatedTask]
      return newTasks
    })

    setDraggedTask(null)
    toast({
      title: "Success",
      description: `Task moved to ${newStatus.replace("-", " ")}`,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgentInputChange = (e) => {
    const { name, value } = e.target
    setNewAgent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgentSelectChange = (name, value) => {
    setNewAgent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAgent = async () => {
    if (!newAgent.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter an agent name",
        variant: "destructive",
      })
      return
    }

    const agentToAdd = {
      ...newAgent,
      id: Date.now(),
      tasksCompleted: 0,
      avatar:
        newAgent.avatar ||
        newAgent.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      recentActivity: [],
    }

    setAgents((prevAgents) => [...prevAgents, agentToAdd])
    setNewAgent({
      name: "",
      role: "",
      status: "active",
      avatar: "",
    })
    setIsAddAgentOpen(false)

    toast({
      title: "Success",
      description: "Agent added successfully",
    })
  }

  const handleEditAgent = async () => {
    if (!editingAgent.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter an agent name",
        variant: "destructive",
      })
      return
    }

    setAgents((prevAgents) => prevAgents.map((agent) => (agent.id === editingAgent.id ? editingAgent : agent)))

    setEditingAgent(null)
    toast({
      title: "Success",
      description: "Agent updated successfully",
    })
  }

  const addAgentLocally = (agent) => {
    setAgents((prevAgents) => [...prevAgents, agent])
    console.log("✅ Agent added locally:", agent.name)
  }

  const handleAddProject = async () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project title",
        variant: "destructive",
      })
      return
    }

    const projectToAdd = {
      ...newProject,
      id: Date.now(),
      progress: 0,
      taskCount: 0,
      completedTasks: 0,
    }

    setProjects((prevProjects) => [...prevProjects, projectToAdd])
    setNewProject({
      title: "",
      description: "",
      deadline: null,
      status: "active",
    })
    setIsAddProjectOpen(false)

    toast({
      title: "Success",
      description: "Project created successfully",
    })
  }

  // Notification functions
  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    toast({
      title: "Success",
      description: "All notifications cleared",
    })
  }

  // Utility functions
  const getSubtaskProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return 0
    const completed = subtasks.filter((st) => st.completed).length
    return Math.round((completed / subtasks.length) * 100)
  }

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks }
      Object.keys(newTasks).forEach((status) => {
        newTasks[status] = newTasks[status].map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              subtasks: task.subtasks.map((st) => (st.id === subtaskId ? { ...st, completed: !st.completed } : st)),
            }
          }
          return task
        })
      })
      return newTasks
    })
  }

  const exportData = (format) => {
    const data = {
      tasks: [...tasks.todo, ...tasks.inProgress, ...tasks.completed],
      agents,
      projects,
    }

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "neurotask-data.json"
      a.click()
    } else if (format === "csv") {
      const csvContent = data.tasks
        .map((task) => `"${task.title}","${task.description}","${task.status}","${task.priority}"`)
        .join("\n")
      const blob = new Blob([`Title,Description,Status,Priority\n${csvContent}`], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "neurotask-tasks.csv"
      a.click()
    }

    toast({
      title: "Success",
      description: `Data exported as ${format.toUpperCase()}`,
    })
  }

  const activities = [
    {
      id: 1,
      type: "task_completed",
      message: "Research Assistant completed 'Database optimization'",
      time: "2 minutes ago",
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: "agent_assigned",
      message: "Content Creator was assigned to 'Create marketing content'",
      time: "15 minutes ago",
      icon: Bot,
    },
    {
      id: 3,
      type: "task_created",
      message: "New task 'Design new landing page' was created",
      time: "1 hour ago",
      icon: Plus,
    },
    {
      id: 4,
      type: "milestone",
      message: "Project Manager reached 30 completed tasks milestone",
      time: "3 hours ago",
      icon: Sparkles,
    },
  ]

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "agents", label: "Agents", icon: Bot },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderTaskCard = (task) => (
    <Card
      key={task.id}
      className="hover:shadow-md transition-shadow cursor-pointer"
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setEditingTask(task)}>
              <Edit className="w-3 h-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6 text-red-600">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-3">{task.description}</p>

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Subtasks</span>
              <span className="text-xs text-gray-500">
                {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
              </span>
            </div>
            <Progress value={getSubtaskProgress(task.subtasks)} className="h-1 mb-2" />
            <div className="space-y-1">
              {task.subtasks.slice(0, 2).map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                    className="h-3 w-3"
                  />
                  <span className={`text-xs ${subtask.completed ? "line-through text-gray-400" : ""}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
              {task.subtasks.length > 2 && (
                <span className="text-xs text-gray-400">+{task.subtasks.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {task.dueDate ? format(task.dueDate, "MMM dd") : "No due date"}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-blue-600">{task.agent}</div>
          {task.recurring?.enabled && (
            <div className="flex items-center gap-1 text-xs text-purple-600">
              <Repeat className="w-3 h-3" />
              {task.recurring.interval}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  // Command palette search
  const allSearchItems = [
    ...tasks.todo.map((task) => ({ ...task, type: "task" })),
    ...tasks.inProgress.map((task) => ({ ...task, type: "task" })),
    ...tasks.completed.map((task) => ({ ...task, type: "task" })),
    ...agents.map((agent) => ({ ...agent, type: "agent" })),
    ...projects.map((project) => ({ ...project, type: "project" })),
  ]

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search tasks, agents, projects..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tasks">
            {allSearchItems
              .filter((item) => item.type === "task")
              .slice(0, 5)
              .map((task) => (
                <CommandItem key={task.id}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  <span>{task.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Agents">
            {allSearchItems
              .filter((item) => item.type === "agent")
              .map((agent) => (
                <CommandItem key={agent.id}>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>{agent.name}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {allSearchItems
              .filter((item) => item.type === "project")
              .map((project) => (
                <CommandItem key={project.id}>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">NeuroTask AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.id === "notifications" && notifications.filter((n) => !n.read).length > 0 && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {notifications.filter((n) => !n.read).length}
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search or press ⌘K..."
                  className="pl-10 w-80"
                  onClick={() => setCommandOpen(true)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="relative">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="relative" onClick={() => setActiveTab("notifications")}>
                <Bell className="w-5 h-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </Button>

              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="p-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Gulshi 👋</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's what's happening with your AI-powered tasks today.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - Agents and Tasks */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Smart Agents Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Smart Agents</h2>
                      <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Agent
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add New Agent</DialogTitle>
                            <DialogDescription>Create a new AI agent to help with your tasks.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="agent-name">Agent Name</Label>
                              <Input
                                id="agent-name"
                                value={newAgent.name}
                                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                                placeholder="Enter agent name"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="agent-role">Role & Specialization</Label>
                              <Input
                                id="agent-role"
                                value={newAgent.role}
                                onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                                placeholder="e.g., Data Analysis & Research"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="agent-avatar">Avatar (Optional)</Label>
                              <Input
                                id="agent-avatar"
                                value={newAgent.avatar}
                                onChange={(e) => setNewAgent({ ...newAgent, avatar: e.target.value })}
                                placeholder="e.g., DA (auto-generated if empty)"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="agent-status">Status</Label>
                              <Select
                                value={newAgent.status}
                                onValueChange={(value) => setNewAgent({ ...newAgent, status: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="idle">Idle</SelectItem>
                                  <SelectItem value="offline">Offline</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddAgent}>Add Agent</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {agents.map((agent) => (
                        <Card
                          key={agent.id}
                          className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setEditingAgent(agent)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                  {agent.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                                {agent.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <CardDescription>{agent.role}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-300">Tasks completed</span>
                              <span className="font-semibold text-blue-600">{agent.tasksCompleted}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Kanban Board */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Task Board</h2>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${apiConnected ? "bg-green-500" : "bg-yellow-500"}`}
                          ></div>
                          <span className="text-xs text-gray-500">
                            {apiConnected ? "API Connected" : "Using Mock Data"}
                          </span>
                        </div>
                      </div>

                      {/* Add Task Dialog */}
                      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                            <DialogDescription>
                              Create a new task and assign it to one of your AI agents.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                placeholder="Enter task title"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                placeholder="Enter task description"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="agent">Assigned Agent</Label>
                                <Select
                                  value={newTask.agent}
                                  onValueChange={(value) => setNewTask({ ...newTask, agent: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select agent" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {agents.map((agent) => (
                                      <SelectItem key={agent.id} value={agent.name}>
                                        {agent.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="project">Project</Label>
                                <Select
                                  value={newTask.projectId}
                                  onValueChange={(value) => setNewTask({ ...newTask, projectId: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select project" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {projects.map((project) => (
                                      <SelectItem key={project.id} value={project.id.toString()}>
                                        {project.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select
                                  value={newTask.priority}
                                  onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  value={newTask.status}
                                  onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Due Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !newTask.dueDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={newTask.dueDate}
                                    onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="grid gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="recurring"
                                  checked={newTask.recurring.enabled}
                                  onCheckedChange={(checked) =>
                                    setNewTask({
                                      ...newTask,
                                      recurring: { ...newTask.recurring, enabled: checked },
                                    })
                                  }
                                />
                                <Label htmlFor="recurring">Recurring Task</Label>
                              </div>
                              {newTask.recurring.enabled && (
                                <Select
                                  value={newTask.recurring.interval}
                                  onValueChange={(value) =>
                                    setNewTask({
                                      ...newTask,
                                      recurring: { ...newTask.recurring, interval: value },
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select interval" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label>Subtasks</Label>
                              <div className="space-y-2">
                                {newTask.subtasks.map((subtask, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Input
                                      value={subtask.title}
                                      onChange={(e) => {
                                        const updatedSubtasks = [...newTask.subtasks]
                                        updatedSubtasks[index] = { ...subtask, title: e.target.value }
                                        setNewTask({ ...newTask, subtasks: updatedSubtasks })
                                      }}
                                      placeholder="Subtask title"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const updatedSubtasks = newTask.subtasks.filter((_, i) => i !== index)
                                        setNewTask({ ...newTask, subtasks: updatedSubtasks })
                                      }}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setNewTask({
                                      ...newTask,
                                      subtasks: [...newTask.subtasks, { title: "", completed: false }],
                                    })
                                  }
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Subtask
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddTask}>Add Task</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {isLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="space-y-3">
                            <Skeleton className="h-4 w-20" />
                            {[1, 2, 3].map((j) => (
                              <Skeleton key={j} className="h-32 w-full" />
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Todo Column */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, "todo")}
                          className="min-h-[200px]"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Todo</h3>
                            <Badge variant="secondary">{tasks.todo.length}</Badge>
                          </div>
                          <div className="space-y-3">
                            {tasks.todo.length === 0 ? (
                              <Card className="p-8 text-center">
                                <div className="text-gray-400 dark:text-gray-500">
                                  <ListTodo className="w-8 h-8 mx-auto mb-2" />
                                  <p className="text-sm">No tasks in todo</p>
                                </div>
                              </Card>
                            ) : (
                              tasks.todo.map(renderTaskCard)
                            )}
                          </div>
                        </div>

                        {/* In Progress Column */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, "in-progress")}
                          className="min-h-[200px]"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <h3 className="font-medium text-gray-900 dark:text-white">In Progress</h3>
                            <Badge variant="secondary">{tasks.inProgress.length}</Badge>
                          </div>
                          <div className="space-y-3">
                            {tasks.inProgress.length === 0 ? (
                              <Card className="p-8 text-center">
                                <div className="text-gray-400 dark:text-gray-500">
                                  <Clock className="w-8 h-8 mx-auto mb-2" />
                                  <p className="text-sm">No tasks in progress</p>
                                </div>
                              </Card>
                            ) : (
                              tasks.inProgress.map(renderTaskCard)
                            )}
                          </div>
                        </div>

                        {/* Completed Column */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, "completed")}
                          className="min-h-[200px]"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Completed</h3>
                            <Badge variant="secondary">{tasks.completed.length}</Badge>
                          </div>
                          <div className="space-y-3">
                            {tasks.completed.length === 0 ? (
                              <Card className="p-8 text-center">
                                <div className="text-gray-400 dark:text-gray-500">
                                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                                  <p className="text-sm">No completed tasks</p>
                                </div>
                              </Card>
                            ) : (
                              tasks.completed.map((task) => (
                                <Card
                                  key={task.id}
                                  className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500 opacity-75"
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, task)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-medium text-gray-900 dark:text-white text-sm line-through">
                                        {task.title}
                                      </h4>
                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                                    <div className="flex items-center justify-between">
                                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </Badge>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <CheckCircle2 className="w-3 h-3" />
                                        {task.completedDate
                                          ? format(task.completedDate, "MMM dd")
                                          : "Recently completed"}
                                      </div>
                                    </div>
                                    <div className="mt-2 text-xs text-blue-600">{task.agent}</div>
                                  </CardContent>
                                </Card>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Activity Feed */}
                <div className="lg:col-span-1">
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>Real-time updates from your AI agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {activities.map((activity, index) => (
                            <div key={activity.id}>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                  <activity.icon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                                </div>
                              </div>
                              {index < activities.length - 1 && <Separator className="my-4" />}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                  <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    {/* Same dialog content as above */}
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Same kanban board as dashboard */}
                <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "todo")} className="min-h-[400px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Todo</h3>
                    <Badge variant="secondary">{tasks.todo.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {tasks.todo.length === 0 ? (
                      <Card className="p-8 text-center">
                        <div className="text-gray-400 dark:text-gray-500">
                          <ListTodo className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">No tasks in todo</p>
                          <p className="text-xs mt-1">Drag tasks here or create a new one</p>
                        </div>
                      </Card>
                    ) : (
                      tasks.todo.map(renderTaskCard)
                    )}
                  </div>
                </div>

                <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "in-progress")} className="min-h-[400px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="font-medium text-gray-900 dark:text-white">In Progress</h3>
                    <Badge variant="secondary">{tasks.inProgress.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {tasks.inProgress.length === 0 ? (
                      <Card className="p-8 text-center">
                        <div className="text-gray-400 dark:text-gray-500">
                          <Clock className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">No tasks in progress</p>
                          <p className="text-xs mt-1">Drag tasks here to start working</p>
                        </div>
                      </Card>
                    ) : (
                      tasks.inProgress.map(renderTaskCard)
                    )}
                  </div>
                </div>

                <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "completed")} className="min-h-[400px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Completed</h3>
                    <Badge variant="secondary">{tasks.completed.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {tasks.completed.length === 0 ? (
                      <Card className="p-8 text-center">
                        <div className="text-gray-400 dark:text-gray-500">
                          <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">No completed tasks</p>
                          <p className="text-xs mt-1">Drag completed tasks here</p>
                        </div>
                      </Card>
                    ) : (
                      tasks.completed.map((task) => (
                        <Card
                          key={task.id}
                          className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500 opacity-75"
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm line-through">
                                {task.title}
                              </h4>
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <CheckCircle2 className="w-3 h-3" />
                                {task.completedDate ? format(task.completedDate, "MMM dd") : "Recently completed"}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-blue-600">{task.agent}</div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === "agents" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agents</h1>
                <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Agent</DialogTitle>
                      <DialogDescription>Create a new AI agent to help with your tasks.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="agent-name">Agent Name</Label>
                        <Input
                          id="agent-name"
                          value={newAgent.name}
                          onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                          placeholder="Enter agent name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="agent-role">Role & Specialization</Label>
                        <Input
                          id="agent-role"
                          value={newAgent.role}
                          onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                          placeholder="e.g., Data Analysis & Research"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="agent-avatar">Avatar (Optional)</Label>
                        <Input
                          id="agent-avatar"
                          value={newAgent.avatar}
                          onChange={(e) => setNewAgent({ ...newAgent, avatar: e.target.value })}
                          placeholder="e.g., DA (auto-generated if empty)"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="agent-status">Status</Label>
                        <Select
                          value={newAgent.status}
                          onValueChange={(value) => setNewAgent({ ...newAgent, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="idle">Idle</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddAgent}>Add Agent</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                            {agent.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                      </div>
                      <CardTitle className="text-xl">{agent.name}</CardTitle>
                      <CardDescription>{agent.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Tasks completed</span>
                          <span className="font-semibold text-blue-600">{agent.tasksCompleted}</span>
                        </div>

                        {agent.recentActivity && agent.recentActivity.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                            <div className="space-y-2">
                              {agent.recentActivity.slice(0, 2).map((activity, index) => (
                                <div key={index} className="text-xs text-gray-600 dark:text-gray-300">
                                  <span className="font-medium">{activity.task}</span> - {activity.action}
                                  <div className="text-gray-400">{activity.time}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingAgent(agent)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Activity className="w-4 h-4 mr-2" />
                            Activity
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
                <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>Set up a new project to organize your tasks.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input
                          id="project-title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="Enter project title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-description">Description</Label>
                        <Textarea
                          id="project-description"
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Enter project description"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Deadline</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !newProject.deadline && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newProject.deadline ? format(newProject.deadline, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newProject.deadline}
                              onSelect={(date) => setNewProject({ ...newProject, deadline: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddProject}>Create Project</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Tasks</span>
                          <span className="font-medium">
                            {project.completedTasks}/{project.taskCount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Deadline</span>
                          <span className="font-medium">
                            {project.deadline ? format(project.deadline, "MMM dd, yyyy") : "No deadline"}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Target className="w-4 h-4 mr-2" />
                            View Tasks
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                    <Archive className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="text-gray-400 dark:text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No notifications</p>
                      <p className="text-xs mt-1">You're all caught up!</p>
                    </div>
                  </Card>
                ) : (
                  notifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200" : ""
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.type === "success"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "warning"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {notification.type === "success" ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : notification.type === "warning" ? (
                              <AlertCircle className="w-4 h-4" />
                            ) : (
                              <Bell className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="data">Data & Export</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how NeuroTask AI looks and feels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Toggle between light and dark themes
                          </p>
                        </div>
                        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Gulshi" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="gulshi@example.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input id="avatar" placeholder="https://example.com/avatar.jpg" />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose what notifications you want to receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Task Updates</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Get notified when tasks are created, updated, or completed
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Agent Activity</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications about agent status and activity
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Project Updates</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Updates about project progress and deadlines
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Due Date Reminders</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Reminders for upcoming task due dates
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Export</CardTitle>
                      <CardDescription>Export your tasks, agents, and projects</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button onClick={() => exportData("json")} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export as JSON
                        </Button>
                        <Button onClick={() => exportData("csv")} variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Export as CSV
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JSON includes all data, CSV includes tasks only
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>Manage your stored data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Total Tasks:</span>
                          <span className="font-medium ml-2">
                            {tasks.todo.length + tasks.inProgress.length + tasks.completed.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Total Agents:</span>
                          <span className="font-medium ml-2">{agents.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Total Projects:</span>
                          <span className="font-medium ml-2">{projects.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Storage Used:</span>
                          <span className="font-medium ml-2">2.4 MB</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Management</CardTitle>
                      <CardDescription>Manage team members and their permissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>GU</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Gulshi (You)</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">gulshi@example.com</p>
                          </div>
                        </div>
                        <Badge>Admin</Badge>
                      </div>

                      <Button className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        Invite Team Member
                      </Button>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Team features are available in the Pro plan. Upgrade to collaborate with your team.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update task details and settings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editingTask.dueDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editingTask.dueDate ? format(editingTask.dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editingTask.dueDate}
                      onSelect={(date) => setEditingTask({ ...editingTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {editingTask.subtasks && (
                <div className="grid gap-2">
                  <Label>Subtasks</Label>
                  <div className="space-y-2">
                    {editingTask.subtasks.map((subtask, index) => (
                      <div key={subtask.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={subtask.completed}
                          onCheckedChange={(checked) => {
                            const updatedSubtasks = [...editingTask.subtasks]
                            updatedSubtasks[index] = { ...subtask, completed: checked }
                            setEditingTask({ ...editingTask, subtasks: updatedSubtasks })
                          }}
                        />
                        <Input
                          value={subtask.title}
                          onChange={(e) => {
                            const updatedSubtasks = [...editingTask.subtasks]
                            updatedSubtasks[index] = { ...subtask, title: e.target.value }
                            setEditingTask({ ...editingTask, subtasks: updatedSubtasks })
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedSubtasks = editingTask.subtasks.filter((_, i) => i !== index)
                            setEditingTask({ ...editingTask, subtasks: updatedSubtasks })
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingTask({
                          ...editingTask,
                          subtasks: [...editingTask.subtasks, { id: Date.now(), title: "", completed: false }],
                        })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subtask
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingTask(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditTask}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Agent Modal */}
      {editingAgent && (
        <Dialog open={!!editingAgent} onOpenChange={() => setEditingAgent(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
              <DialogDescription>Update agent information and settings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-agent-name">Agent Name</Label>
                <Input
                  id="edit-agent-name"
                  value={editingAgent.name}
                  onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-agent-role">Role & Specialization</Label>
                <Input
                  id="edit-agent-role"
                  value={editingAgent.role}
                  onChange={(e) => setEditingAgent({ ...editingAgent, role: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-agent-status">Status</Label>
                <Select
                  value={editingAgent.status}
                  onValueChange={(value) => setEditingAgent({ ...editingAgent, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingAgent(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditAgent}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
