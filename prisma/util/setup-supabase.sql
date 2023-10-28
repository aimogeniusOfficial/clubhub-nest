ALTER TABLE "public"."GrowSpace" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Get user-specific rows in grow space" ON "public"."GrowSpace" FOR SELECT USING (("auth"."uid"() = "userId"));

CREATE POLICY "Update user-specific rows in grow space" ON "public"."GrowSpace" FOR UPDATE USING (("auth"."uid"() = "userId")) WITH CHECK (("auth"."uid"() = "userId"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."GrowSpace" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable delete for users based on userId" ON "public"."GrowSpace" FOR DELETE USING (("auth"."uid"() = "userId"));

ALTER TABLE "public"."GrowCycle" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Get user-specific rows in Grow Cycle" ON "public"."GrowCycle" FOR SELECT USING (("auth"."uid"() = "userId"));

CREATE POLICY "Update user-specific rows in Grow Cycle" ON "public"."GrowCycle" FOR UPDATE USING (("auth"."uid"() = "userId")) WITH CHECK (("auth"."uid"() = "userId"));

CREATE POLICY "Enable insert for authenticated users only in Grow Cycle" ON "public"."GrowCycle" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete for users based on userId in Grow Cycle" ON "public"."GrowCycle" FOR DELETE USING (("auth"."uid"() = "userId"));

insert into storage.buckets
  (id, name, public)
values
  ('journal', 'journal', true);


create policy "Give anon users access to journal_entries"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'journal'::text));


create policy "Insert journal_entries for only authenticated"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'journal'::text));
