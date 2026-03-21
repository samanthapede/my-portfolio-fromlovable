import { createContext, useContext, useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  projectDetails: z.string().min(1, "Please share a few details about your project"),
});

type FormValues = z.infer<typeof formSchema>;

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

type ConversationModalContextType = {
  openDialog: () => void;
};

const ConversationModalContext = createContext<ConversationModalContextType | null>(null);

export const useConversationModal = () => {
  const ctx = useContext(ConversationModalContext);
  if (!ctx) throw new Error("useConversationModal must be used within ConversationModalProvider");
  return ctx;
};

export const ConversationModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", projectDetails: "" },
  });

  const onSubmit = async (data: FormValues) => {
    if (!FORMSPREE_FORM_ID) {
      toast({
        title: "Form not configured",
        description: "Please set VITE_FORMSPREE_FORM_ID in .env.local to receive submissions. Get one at formspree.io",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          _subject: `New conversation from ${data.name}`,
          projectDetails: data.projectDetails,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      toast({
        title: "Message sent",
        description: "I'll get back to you soon.",
      });
      form.reset();
      setOpen(false);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDialog = () => setOpen(true);

  return (
    <ConversationModalContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md border border-warm-gradient-subtle rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-primary-text">Start a conversation</DialogTitle>
            <DialogDescription>
              Share your name and a bit about your project. I'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" className="rounded-lg" autoFocus {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">Project details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What are you working on? What do you need help with?"
                        className="min-h-[120px] rounded-lg resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="gradient-hover-outline rounded-lg hover:bg-background"
                >
                  <span className="relative z-10">Cancel</span>
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-text hover:bg-primary-text/90 dark:bg-[#2563EB] dark:hover:bg-[#1d4ed8] rounded-lg text-white"
                >
                  {isSubmitting ? "Sending…" : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ConversationModalContext.Provider>
  );
};
