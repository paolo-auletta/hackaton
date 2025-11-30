import fs from "fs";
import path from "path";

import { db } from "../src/lib/db/client";
import { students } from "../src/lib/db/schema";

type SyntheticStudent = {
  user_id: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  country?: string;
  languages?: string[];
  current_status?: string;
  field_of_study?: string;
  job_role?: string;
  financial_support_per_year?: number;
  financial_support_duration?: number;
  financial_support_return?: string;
  description?: string;
};

async function main() {
  const dataPath = path.resolve(
    process.cwd(),
    "../python-backend/synthetic_students.json",
  );

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Data file not found at ${dataPath}`);
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Expected an array in synthetic_students.json");
  }

  const studentsData: SyntheticStudent[] = parsed;

  console.log(`Loaded ${studentsData.length} synthetic students from JSON.`);

  let count = 0;
  for (const s of studentsData) {
    if (!s.user_id) {
      console.warn("Skipping student without user_id", s);
      continue;
    }

    const normalizedCountry = (() => {
      if (!s.country) return null;
      if (s.country === "USA") return "United States";
      if (s.country === "UK") return "United Kingdom";
      if (s.country === "UAE") return "United Arab Emirates";
      return s.country;
    })();

    const values = {
      userId: s.user_id,
      name: s.first_name ?? null,
      surname: s.last_name ?? null,
      age: s.age ?? null,
      country: normalizedCountry,
      languages: Array.isArray(s.languages) ? s.languages : [],
      currentStatus: s.current_status ?? null,
      currentFieldOfStudy: s.field_of_study ?? null,
      jobRole: s.job_role ?? null,
      financialSupportPerYear: s.financial_support_per_year ?? null,
      financialSupportDuration: s.financial_support_duration ?? null,
      financialSupportReturn: s.financial_support_return ?? null,
      description: s.description ?? null,
    } as const;

    await db
      .insert(students)
      .values(values)
      .onConflictDoUpdate({
        target: students.userId,
        set: values,
      });

    count += 1;
    console.log(`Upserted student ${s.user_id}`);
  }

  console.log(`Done. Upserted ${count} students into Supabase.`);
}

main().catch((err) => {
  console.error("Error populating Supabase from synthetic_students.json:", err);
  process.exit(1);
});
