import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Facebook, Mail, Github, Linkedin, File } from "lucide-react";
import Link from "next/link";
import { DialogOut } from "@/components/email-dialog";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Nunieza",
  description: "Hey this is my Portfolio",
};

type LinkTypes = {
  href: string,
  linkName: string,
  download: boolean,
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const links: LinkTypes[] = [
  {
    href: "/assets/resume/James-Nunieza.pdf",
    linkName:"Check My Resume",
    download: true,
    Component: File
  },
  {
    href:"https://github.com/Jacome23",
    linkName:"Github",
    download: false,
    Component: Github
  },
  {
    href: "https://www.linkedin.com/in/james-nunieza-bb6717199/",
    linkName:"LinkedIn",
    download: false,
    Component: Linkedin
  },
  {
    href: "https://www.facebook.com/james.nunieza1",
    linkName:"Facebook",
    download: false,
    Component: Facebook
  },
  {
    href: "mailto:your.nuniezajames10@gmail.com",
    linkName:"Email Me",
    download: false,
    Component: Mail
  }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

  {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar/>
          <SidebarInset>
            <header className="sticky top-0 border-b bg-white">
              <div className="flex h-12 items-center gap-2 px-4">
                <SidebarTrigger toolTipName="Click me to show a sidebar. I put templates in there for examples" className="-ml-1 flex-none" />
                <div className="grow"/>
                <DialogOut/>
                {links.map(({href,linkName,download,Component}) =>{
                  return <div key={href}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link target="_blank" 
                              href={href} 
                              download={download}
                              className="text-muted-foreground hover:text-foreground transition-colors">
                          <Component className="h-6 w-6" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        {linkName}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                })}
              </div>
            </header>
            <main>
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster/>
      </body>
    </html>
  );
}
