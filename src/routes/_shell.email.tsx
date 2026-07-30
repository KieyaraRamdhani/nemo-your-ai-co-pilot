import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MailCheck } from "lucide-react";
import { useState } from "react";

import { ToolWorkspace } from "@/components/nemo/ToolWorkspace";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/_shell/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Nemo" },
      {
        name: "description",
        content:
          "Generate formal, friendly or persuasive business emails in seconds with Nemo's AI email writer.",
      },
      { property: "og:title", content: "Smart Email Generator | Nemo" },
      {
        property: "og:description",
        content: "Draft professional workplace emails with tone control, copy and download.",
      },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (purpose.trim().length < 3) {
      setError("Please describe the purpose of the email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { text } = await run({
        data: { recipient, company, context, purpose, tone },
      });
      setResult(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      title="Smart Email Generator"
      description="Professional emails, written for you in the right tone."
      icon={<MailCheck className="size-5" />}
      statusLabel="Drafting Email"
      downloadName="nemo-email"
      examples={[
        "Follow up after a client demo",
        "Request a project deadline extension",
        "Introduce our services to a new lead",
      ]}
      onExample={(example) => setPurpose(example)}
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                value={recipient}
                maxLength={120}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Sarah Chen, Operations Lead"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                maxLength={120}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Harbour Logistics"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              value={purpose}
              maxLength={1000}
              required
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Request a follow-up meeting next week"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="context">Context</Label>
            <Textarea
              id="context"
              value={context}
              maxLength={4000}
              rows={5}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Background the AI should know: history, decisions, constraints..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="btn-shine w-full rounded-xl">
            {loading ? "Generating..." : "Generate Email"}
          </Button>
        </form>
      }
    />
  );
}
