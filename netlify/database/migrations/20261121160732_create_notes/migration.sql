CREATE TABLE "notes" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
