"use client";

import { useState } from "react";
import { User, HelpCircle, Users, MessageSquare, GraduationCap, MapPin, BookOpen, Wallet, Send, Search, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const MENU_ITEMS = [
  { name: "Profile", icon: User },
  { name: "Questions", icon: HelpCircle },
  { name: "Matches", icon: Users },
  { name: "Chat", icon: MessageSquare },
];

export default function GeniusPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col gap-6 border-r bg-white px-6 py-8">
        <div className="text-lg font-bold tracking-wider text-blue-900">
          Genius
        </div>
        <nav className="flex flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <Button
              key={item.name}
              variant={activeTab === item.name ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-3 text-sm font-medium",
                activeTab === item.name 
                  ? "bg-blue-50 text-blue-900" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-12 py-8">
        {activeTab === "Profile" && (
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
              <p className="text-sm text-slate-500">Manage your academic details and scholarship preferences.</p>
            </div>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Your basic contact and identification details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-slate-500">Name</Label>
                  <Input id="name" placeholder="Sara" className="bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-xs font-medium uppercase tracking-wider text-slate-500">Surname</Label>
                  <Input id="surname" placeholder="Rossi" className="bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="country" placeholder="Bologna, Italy" className="bg-slate-50/50 pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-xs font-medium uppercase tracking-wider text-slate-500">Age</Label>
                  <Input id="age" placeholder="21" className="bg-slate-50/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Academic Status</CardTitle>
                <CardDescription>Tell us about your studies and university.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="university" className="text-xs font-medium uppercase tracking-wider text-slate-500">University</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input id="university" placeholder="Università di Bologna" className="bg-slate-50/50 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-xs font-medium uppercase tracking-wider text-slate-500">Year of Study</Label>
                    <Input id="year" placeholder="2nd Year" className="bg-slate-50/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-xs font-medium uppercase tracking-wider text-slate-500">Degree / Field of Study</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="degree" placeholder="Computer Science (BSc)" className="bg-slate-50/50 pl-9" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Support Needs</CardTitle>
                <CardDescription>What kind of financial or academic support do you need?</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="support" className="text-xs font-medium uppercase tracking-wider text-slate-500">Support Type</Label>
                    <div className="relative">
                      <Wallet className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input id="support" placeholder="Tuition & living costs" className="bg-slate-50/50 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-xs font-medium uppercase tracking-wider text-slate-500">Duration Needed</Label>
                    <Input id="duration" placeholder="12 months" className="bg-slate-50/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-medium uppercase tracking-wider text-slate-500">Personal Statement</Label>
                  <Textarea 
                    id="description" 
                    placeholder="I am looking for financial support to cover tuition..." 
                    className="min-h-[120px] bg-slate-50/50 leading-relaxed" 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button className="bg-blue-900 px-8 text-white hover:bg-blue-800">Save Profile</Button>
            </div>
          </div>
        )}

        {activeTab === "Chat" && <GeniusChatSection />}

        {activeTab !== "Profile" && activeTab !== "Chat" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="rounded-full bg-slate-100 p-4">
              {(() => {
                const activeItem = MENU_ITEMS.find((i) => i.name === activeTab);
                const ActiveIcon = activeItem?.icon;
                return ActiveIcon ? (
                  <ActiveIcon className="h-8 w-8 text-slate-400" />
                ) : null;
              })()}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{activeTab}</h3>
            <p className="text-slate-500">This section is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function GeniusChatSection() {
  const [activeChat, setActiveChat] = useState<string>("Investor A");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<
    Record<string, { id: number; text: string; sender: "me" | "other"; time: string }[]>
  >({
    "Investor A": [
      {
        id: 1,
        text: "Hello, I'm a Computer Science student in Bologna looking for support with tuition and living costs.",
        sender: "me",
        time: "10:30 AM",
      },
      {
        id: 2,
        text: "Hi! Thanks for reaching out, I would love to learn more about your goals.",
        sender: "other",
        time: "10:32 AM",
      },
    ],
    "Investor B": [
      {
        id: 1,
        text: "Good evening, I'm interested in scholarships for my first year in Economics.",
        sender: "me",
        time: "Yesterday",
      },
    ],
  });

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "me" as const,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));

    setMessageInput("");
  };

  const chatList = ["Investor A", "Investor B"];

  return (
    <div className="flex h-[600px] w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-100 bg-slate-50/50">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search investors"
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          {chatList.map((name) => (
            <button
              key={name}
              onClick={() => setActiveChat(name)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-left transition-colors",
                activeChat === name ? "bg-blue-50 border-r-2 border-blue-900" : "hover:bg-slate-100"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      activeChat === name ? "text-blue-900" : "text-slate-900"
                    )}
                  >
                    {name}
                  </span>
                  <span className="text-[10px] text-slate-400">10:32</span>
                </div>
                <p className="truncate text-xs text-slate-500">
                  {messages[name]?.[messages[name].length - 1]?.text || "No messages yet"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {activeChat
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{activeChat}</h3>
              <p className="text-[10px] text-slate-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages[activeChat]?.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  msg.sender === "me" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
                    msg.sender === "me"
                      ? "bg-blue-900 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-800 rounded-bl-none"
                  )}
                >
                  <p>{msg.text}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      msg.sender === "me" ? "text-blue-200" : "text-slate-400"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-4">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Write a message to your investor..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-full bg-blue-900 text-white hover:bg-blue-800"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
