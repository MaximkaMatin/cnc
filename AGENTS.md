<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Leads from the public site form are stored in `public.leads` (anon INSERT-only via RLS) and written through the `submitLead` server fn in `src/lib/leads.functions.ts` — keeps writes validated server-side without exposing reads.
- `src/integrations/supabase/types.ts` may lag the live schema (new tables appear as `never`); server fns cast the client where needed instead of editing the auto-generated types.
- The full-screen photo viewer is a self-contained portal overlay in `MachineGallery`, not a Radix Dialog — pulling a new client-only dep in mid-session makes Vite re-optimize and serve two React copies, which crashes hooks with a null dispatcher.
