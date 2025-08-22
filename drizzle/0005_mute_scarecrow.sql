ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_user_id_course_id_unique";--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "courseId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "course_id";--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_title_unique" UNIQUE("title");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_courseId_unique" UNIQUE("userId","courseId");