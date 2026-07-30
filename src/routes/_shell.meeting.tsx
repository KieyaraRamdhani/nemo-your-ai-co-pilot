import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FileText } from "lucide-react";
import { useState } from "react";

import { ToolWorkspace } from "@/components/nemo/ToolWorkspace";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summariseMeeting } from "@/lib/ai.functions";

export const Route = createFileRoute("/_shell/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summariser | Nemo" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into an executive summary, decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summariser | Nemo" },
      {
        property: "og:description",
        content: "AI meeting minutes with decisions, action items and deadlines.",
      },
    ],
  }),
  component: MeetingPage,
});

function MeetingPage() {
  const run = useServerFn(summariseMeeting);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (notes.trim().length < 20) {
      setError("Paste at least a few lines of meeting notes.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { text } = await run({ data: { notes } });
      setResult(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      title="Meeting Notes Summariser"
      description="Raw notes in, decision-ready minutes out."
      icon={<FileText className="size-5" />}
      statusLabel="Summarising Notes"
      downloadName="nemo-meeting-summary"
      examples={[
        "Weekly product stand-up transcript",
        "Client kickoff call notes",
        "Quarterly budget review discussion",
      ]}
      onExample={(example) => setNotes(`${notes}\n${example}: `.trim())}
      result={result}
      loading={loading}
      error={error}
      onRegenerate={() => void submit()}
      form={
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="notes">Meeting notes</Label>
            <Textarea
              id="notes"
              value={notes}
              rows={16}
              maxLength={20000}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your raw notes or transcript here..."
            />
            <p className="text-xs text-muted-foreground">{notes.length} / 20000 characters</p>
          </div>
          <Button type="submit" disabled={loading} className="btn-shine w-full rounded-xl">
            {loading ? "Summarising..." : "Summarise Meeting"}
          </Button>
        </form>
      }
    />
  );
}
