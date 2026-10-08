create policy "Anyone can upload a drawing"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'drawings');

create policy "No public reads of drawings"
on storage.objects
for select
to authenticated
using (bucket_id = 'drawings');