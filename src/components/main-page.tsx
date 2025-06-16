"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowDown, Github, Linkedin, Mail, Twitter, MapPin, Phone } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const Me = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              {'Hi, I am '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                James Nunieza
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              A passionate developer creating amazing digital experiences. Specializing in modern web technologies and
              intuitive user-centered designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button size="lg" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-6 mb-12">
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center lg:justify-end">
            <div>
              <div className="w-80 h-96 sm:w-96 sm:h-[28rem] rounded-lg overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/assets/james-motor.jpg"
                  alt="James Nunieza - Profile Picture"
                  width={400}
                  height={450}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-12">
          <Link
            href="#about"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-64 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Image
                src="/assets/james-osaka.jpg"
                alt="James Nunieza - Profile Picture"
                width={400}
                height={450}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              {"I'm"} a developer with over 4 years of experience in creating digital solutions that make a
              difference. I love turning complex problems into simple but meaningful solutions.
            </p>

            <p className="text-lg text-muted-foreground">
              When {"I'm"} not coding, you can find me exploring new technologies, or
              sharing knowledge with the developer community.
            </p>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Facts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>📍 I live in Las Pinas City, Philippines</li>
                  <li>🎓 Degree in Electronics Engineering</li>
                  <li>💼 4+ years of experience</li>
                  <li>🌟 3+ projects completed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Vue.js", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 75 },
      { name: "Sequelize", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MSSQL", level: 75 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 60 },
      { name: "AWS", level: 60 },
      { name: "Figma", level: 70 },
      { name: "PowerApps", level: 80},
      { name: "Cypress", level: 50}
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "English", level: 90 },
      { name: "Tagalog", level:80 },
      { name: "Bisaya", level:80 },
    ],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Skills & Technologies</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const projects = [
  {
    title: "Workforce Planning Tool",
    description: "A full-stack Resourcing Solution for Arcadis used for Project Management and Workload Forecasting.",
    image: "/assets/projects/wpt.png",
    technologies: ["Vue", "Node.js", "Express", "Sequelize", "MSSQL"],
    liveUrl: "",
    githubUrl: "",
  },
  // {
  //   title: "Task Management App",
  //   description: "A collaborative task management application with real-time updates and team collaboration features.",
  //   image: "/placeholder.svg?height=200&width=400",
  //   technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/username/project",
  // },
  // {
  //   title: "Weather Dashboard",
  //   description: "A beautiful weather dashboard with location-based forecasts and interactive charts.",
  //   image: "/placeholder.svg?height=200&width=400",
  //   technologies: ["Vue.js", "Chart.js", "Weather API", "Tailwind CSS"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/username/project",
  // },
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{"Let's work together"}</h3>
              <p className="text-muted-foreground mb-6">
                {"I'm"}always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Your City, Country</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and {"I'll"} get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">James Nunieza</h3>
            <p className="text-muted-foreground">Building the future, one line of code at a time.</p>
          </div>

          <div className="flex space-x-6">
            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} James Nunieza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export {
    About,
    Contact,
    Footer,
    Me,
    Projects,
    Skills
}

