"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COUNTRIES,
  LANGUAGES,
  FIELDS_OF_STUDY,
} from "../../constants/metadata";

type StudentSummaries = {
  summary_overall: string;
  summary_field: string;
  summary_behaviour: string;
};

type StudentCreateResponse = {
  student_id: string;
  user_id: string;
  summaries: StudentSummaries;
};

type MatchStudentResult = {
  student_id: string;
  user: string | null;
  field_score: number;
  behaviour_score: number;
  overall_match: number;
  summary_field: string | null;
  summary_behaviour: string | null;
};

type BelieverQueries = {
  query_field?: string;
  query_behaviour?: string;
};

type BelieverMatchResponse = {
  queries: BelieverQueries;
  combined_results: MatchStudentResult[];
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [country, setCountry] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [matchFieldOfStudy, setMatchFieldOfStudy] = useState("");
  const [matchCountry, setMatchCountry] = useState("");
  const [matchLanguages, setMatchLanguages] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [studentResponse, setStudentResponse] =
    useState<StudentCreateResponse | null>(null);

  const [believerText, setBelieverText] = useState("");
  const [topK, setTopK] = useState(5);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [matchResponse, setMatchResponse] =
    useState<BelieverMatchResponse | null>(null);

  async function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !description) {
      setCreateError("User ID and description are required.");
      return;
    }
    setIsCreating(true);
    setCreateError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          description,
          field_of_study: fieldOfStudy || null,
          country: country || null,
          languages,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create student");
      }

      const data = (await res.json()) as StudentCreateResponse;
      setStudentResponse(data);
    } catch (error) {
      setCreateError(
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setIsCreating(false);
    }
  }

  async function handleMatchStudents(e: React.FormEvent) {
    e.preventDefault();
    if (!believerText) {
      setMatchError("Believer text is required.");
      return;
    }
    setIsMatching(true);
    setMatchError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/match-students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          believer_text: believerText,
          top_k: topK,
          field_of_study: matchFieldOfStudy || null,
          country: matchCountry || null,
          languages: matchLanguages,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to match students");
      }

      const data = (await res.json()) as BelieverMatchResponse;
      setMatchResponse(data);
    } catch (error) {
      setMatchError(
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setIsMatching(false);
    }
  }

  const queryField =
    typeof matchResponse?.queries?.query_field === "string"
      ? (matchResponse.queries.query_field as string)
      : undefined;
  const queryBehaviour =
    typeof matchResponse?.queries?.query_behaviour === "string"
      ? (matchResponse.queries.query_behaviour as string)
      : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Student matcher demo</h1>
          <p className="text-sm text-muted-foreground">
            Backend: {BACKEND_URL}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create student</CardTitle>
              <CardDescription>
                Send a student description to the Python backend and see the
                generated summaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleCreateStudent}>
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="student-123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Student description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Paste the student's description..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of study</Label>
                  <select
                    id="fieldOfStudy"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a field</option>
                    {FIELDS_OF_STUDY.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => {
                      const selected = languages.includes(lang);
                      return (
                        <Button
                          key={lang}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setLanguages((prev) =>
                              prev.includes(lang)
                                ? prev.filter((l) => l !== lang)
                                : [...prev, lang],
                            );
                          }}
                        >
                          {lang}
                        </Button>
                      );
                    })}
                  </div>
                  {languages.length ? (
                    <p className="text-xs text-muted-foreground">
                      Selected: {languages.join(", ")}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Select one or more languages.
                    </p>
                  )}
                </div>
                {createError ? (
                  <p className="text-sm text-destructive">{createError}</p>
                ) : null}
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create student"}
                </Button>
              </form>
              {studentResponse ? (
                <div className="mt-6 space-y-3 rounded-md border bg-muted/40 p-4 text-sm">
                  <div className="font-medium">
                    Student ID: {studentResponse.student_id}
                  </div>
                  <div>
                    <div className="font-medium">Overall</div>
                    <p>{studentResponse.summaries.summary_overall}</p>
                  </div>
                  <div>
                    <div className="font-medium">Field</div>
                    <p>{studentResponse.summaries.summary_field}</p>
                  </div>
                  <div>
                    <div className="font-medium">Behaviour</div>
                    <p>{studentResponse.summaries.summary_behaviour}</p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match students</CardTitle>
              <CardDescription>
                Describe the kind of students you are looking for and get ranked
                matches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleMatchStudents}>
                <div className="space-y-2">
                  <Label htmlFor="believerText">Believer text</Label>
                  <Textarea
                    id="believerText"
                    value={believerText}
                    onChange={(e) => setBelieverText(e.target.value)}
                    rows={6}
                    placeholder="Describe the ideal students..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topK">Number of matches</Label>
                  <Input
                    id="topK"
                    type="number"
                    min={1}
                    max={20}
                    value={topK}
                    onChange={(e) =>
                      setTopK(Number(e.target.value) || 1)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchFieldOfStudy">Field of study (filter)</Label>
                  <select
                    id="matchFieldOfStudy"
                    value={matchFieldOfStudy}
                    onChange={(e) => setMatchFieldOfStudy(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Any field</option>
                    {FIELDS_OF_STUDY.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchCountry">Country (filter)</Label>
                  <select
                    id="matchCountry"
                    value={matchCountry}
                    onChange={(e) => setMatchCountry(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Any country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchLanguages">Languages (filter)</Label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => {
                      const selected = matchLanguages.includes(lang);
                      return (
                        <Button
                          key={lang}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setMatchLanguages((prev) =>
                              prev.includes(lang)
                                ? prev.filter((l) => l !== lang)
                                : [...prev, lang],
                            );
                          }}
                        >
                          {lang}
                        </Button>
                      );
                    })}
                  </div>
                  {matchLanguages.length ? (
                    <p className="text-xs text-muted-foreground">
                      Selected: {matchLanguages.join(", ")}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Select one or more languages.
                    </p>
                  )}
                </div>
                {matchError ? (
                  <p className="text-sm text-destructive">{matchError}</p>
                ) : null}
                <Button type="submit" disabled={isMatching}>
                  {isMatching ? "Matching..." : "Match students"}
                </Button>
              </form>

              {queryField || queryBehaviour ? (
                <div className="mt-6 space-y-2 rounded-md border bg-muted/40 p-4 text-sm">
                  <div className="font-medium">Interpreted query</div>
                  {queryField ? (
                    <p>
                      <span className="font-medium">Field: </span>
                      {queryField}
                    </p>
                  ) : null}
                  {queryBehaviour ? (
                    <p>
                      <span className="font-medium">Behaviour: </span>
                      {queryBehaviour}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {matchResponse?.combined_results?.length ? (
                <div className="mt-6 space-y-4 text-sm">
                  {matchResponse.combined_results.map((item) => (
                    <div
                      key={item.student_id}
                      className="rounded-md border bg-card p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{item.student_id}</div>
                        <div className="text-xs text-muted-foreground">
                          Overall match: {item.overall_match.toFixed(3)}
                        </div>
                      </div>
                      {item.user ? (
                        <div className="text-xs text-muted-foreground">
                          User: {item.user}
                        </div>
                      ) : null}
                      {item.summary_field ? (
                        <div className="mt-2">
                          <div className="text-xs font-medium uppercase text-muted-foreground">
                            Field
                          </div>
                          <p>{item.summary_field}</p>
                        </div>
                      ) : null}
                      {item.summary_behaviour ? (
                        <div className="mt-2">
                          <div className="text-xs font-medium uppercase text-muted-foreground">
                            Behaviour
                          </div>
                          <p>{item.summary_behaviour}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
