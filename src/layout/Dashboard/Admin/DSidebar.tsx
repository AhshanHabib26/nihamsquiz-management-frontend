import * as React from "react";
import { Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import DLogoIcon from "../../../assets/icons/quiz.png"

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
      title: "MCQ",
      url: "#",
      items: [
        {
          title: "All MCQ",
          url: "all-mcq",
        },
        {
          title: "Create MCQ",
          url: "create-mcq",
        },
        {
          title: "Chapter",
          url: "chapter",
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
      title: "User Submission",
      url: "#",
      items: [
        {
          title: "All Submission",
          url: "submission",
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
      title: "Feedback & Suggestions",
      url: "#",
      items: [
        {
          title: "Feedback",
          url: "all-feedback",
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
        {
          title: "Back To Home",
          url: "/",
        },
      ],
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={DLogoIcon} alt="Dashboard Logo" className="size-8" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Nihamsquiz</span>
                  <span className="">v1.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
