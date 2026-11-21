import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { notes } from "../../db/schema.js";

export default async (req: Request) => {
  try {
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const clean = String(body?.name ?? "").trim().slice(0, 100);
      if (clean) {
        await db.insert(notes).values({ name: clean });
      }
    } else if (req.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const rows = await db
      .select({ name: notes.name, created_at: notes.createdAt })
      .from(notes)
      .orderBy(desc(notes.id))
      .limit(50);
    return Response.json(rows);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server xatosi" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/notes",
};
