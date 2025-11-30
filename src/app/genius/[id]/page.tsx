"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data database - in a real app this would come from an API or database
const GENIUS_DATA: Record<string, any> = {
  "1": {
    name: "Sara Rossi",
    role: "STEM",
    university: "Università di Bologna",
    degree: "Computer Science (BSc)",
    year: "2nd year",
    support: "Tuition & living costs",
    description: "I am in my second year of Computer Science and looking for financial support to cover tuition and living costs while I focus on my studies. I am passionate about AI and want to specialize in machine learning.",
    stats: { field: 53, finances: 19, behaviour: 28 }
  },
  "2": {
    name: "Luca Bianchi",
    role: "Business",
    university: "Università Bocconi",
    degree: "Economics and Management",
    year: "1st year",
    support: "Accommodation & books",
    description: "I have just started my degree in Economics and I am looking for support to afford accommodation in Milano and the study materials I need. My goal is to work in sustainable finance.",
    stats: { field: 33, finances: 34, behaviour: 33 }
  }
};

export default function GeniusProfilePage() {
  const params = useParams();
  // Handle potential array or string for params.id
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const genius = id ? GENIUS_DATA[id] : null;

  if (!genius) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-500">Genius not found</p>
        <Link href="/genius">
          <Button variant="outline">Back to list</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/genie">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-200">
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Button>
          </Link>
          <div className="text-sm font-medium text-slate-500">Back to Discover</div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{genius.name}</h1>
              <Badge className="rounded-full bg-blue-900 px-3 py-1 text-sm font-medium text-white">
                {genius.role}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{genius.university.split("•")[0]}</span>
            </div>
          </div>
          
          <Button className="gap-2 rounded-full bg-blue-900 px-6 hover:bg-blue-800">
            <MessageSquare className="h-4 w-4" />
            Chat with {genius.name.split(" ")[0]}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {/* Left Column: Details */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard 
                icon={<GraduationCap className="h-4 w-4 text-blue-600" />}
                label="Degree"
                value={genius.degree}
              />
              <InfoCard 
                icon={<Calendar className="h-4 w-4 text-blue-600" />}
                label="Year"
                value={genius.year}
              />
              <InfoCard 
                icon={<BookOpen className="h-4 w-4 text-blue-600" />}
                label="Support Needed"
                value={genius.support}
              />
              <InfoCard 
                icon={<MapPin className="h-4 w-4 text-blue-600" />}
                label="University"
                value={genius.university}
              />
            </div>

            {/* About Section */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">About {genius.name.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  {genius.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Chart */}
          <div className="space-y-6">
            <ChartRadialStacked initialStats={genius.stats} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200">
      <div className="rounded-full bg-blue-50 p-2">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

const chartConfig = {
  field: {
    label: "Field",
    color: "var(--chart-1)",
  },
  finances: {
    label: "Finances",
    color: "var(--chart-2)",
  },
  behaviour: {
    label: "Behaviour",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function ChartCategoryLegend({
  field,
  finances,
  behaviour,
}: {
  field: number;
  finances: number;
  behaviour: number;
}) {
  return (
    <div className="mt-3 grid w-full grid-cols-3 gap-2 text-[11px]">
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#2563eb" }} />
        <span className="text-slate-600">Field</span>
        <span className="ml-auto font-semibold">{field}%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
        <span className="text-slate-600">Financies</span>
        <span className="ml-auto font-semibold">{finances}%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#f97316" }} />
        <span className="text-slate-600">Behaviour</span>
        <span className="ml-auto font-semibold">{behaviour}%</span>
      </div>
    </div>
  );
}

function ChartRadialStacked({ initialStats }: { initialStats: { field: number; finances: number; behaviour: number } }) {
  const { field, finances, behaviour } = initialStats;
  const totalScore = field + finances + behaviour;

  const chartData = [
    { name: "Field", key: "field", value: field, fill: "#2563eb" },
    { name: "Financies", key: "finances", value: finances, fill: "#22c55e" },
    { name: "Behaviour", key: "behaviour", value: behaviour, fill: "#f97316" },
  ];

  return (
    <Card className="flex flex-col border-slate-200 shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>Match Percentage Breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <div className="relative mx-auto h-[200px] w-full max-w-[250px] overflow-visible">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full overflow-visible"
          >
            <RadialBarChart
              width={250}
              height={200}
              cx="50%"
              cy="70%"
              innerRadius={70}
              outerRadius={120}
              startAngle={180}
              endAngle={0}
              data={chartData}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <RadialBar
                dataKey="value"
                background
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex translate-y-4 items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">
                {totalScore}%
              </div>
              <div className="text-[11px] text-slate-500">Match</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Distribution across categories
        </div>
        <div className="text-muted-foreground leading-none text-xs text-center">
          Behaviour, field, and finances add up to 100%
        </div>
        <ChartCategoryLegend
          field={field}
          finances={finances}
          behaviour={behaviour}
        />
      </CardFooter>
    </Card>
  );
}