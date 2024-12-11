import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Dashboard Info",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "My Submissions",
          url: "my-submissions",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      items: [
        {
          title: "All Post",
          url: "all-post",
        },
        {
          title: "Create Post",
          url: "create-post",
        },
        {
          title: "Post Category",
          url: "post-category",
        },
      ],
    },
    {
      title: "Quizs",
      url: "#",
      items: [
        {
          title: "All Quiz",
          url: "all-quiz",
        },
        {
          title: "Create Quiz",
          url: "create-quiz",
        },
        {
          title: "Quiz Category",
          url: "quiz-category",
        },
        {
          title: "Create Quiz Category",
          url: "create-quiz-category",
        },
      ],
    },
    {
      title: "Package Plan",
      url: "#",
      items: [
        {
          title: "Package",
          url: "package",
        },
        {
          title: "Create Package",
          url: "create-package",
        },
        {
          title: "All Subscriber",
          url: "subscriber",
        },
      ],
    },
    {
      title: "Comments",
      url: "#",
      items: [
        {
          title: "Comment",
          url: "comments",
        },
      ],
    },
    {
      title: "User",
      url: "#",
      items: [
        {
          title: "All User",
          url: "all-user",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Profile",
          url: "profile",
        },
        {
          title: "Change Password",
          url: "change-password",
        },
      ],
    },
    {
      title: "Back To Home",
      url: "/",
    },
  ],
};

export function DSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Nihamsquiz</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
