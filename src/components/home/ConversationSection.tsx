import { useState } from "react";
import { motion } from "framer-motion";
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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  projectDetails: z.string().min(1, "Please share a few details about your project"),
});

type FormValues = z.infer<typeof formSchema>;

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

export const ConversationSection = () => {
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

  return (
    <section className="py-20 sm:py-24 lg:py-32 border-solid border-0 bg-warm-gradient-subtle">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-10 sm:mb-12 text-primary-text">
            I help teams make{" "}
            <span className="warm-gradient-text opacity-[0.65] dark:opacity-100">the right product decisions early</span>
            , so they can move forward with confidence.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setOpen(true)}
            className="conversation-cta-btn rounded-lg px-8 py-6 text-lg font-medium transition-all duration-300"
          >
            Start a conversation
          </Button>
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md border border-warm-gradient-subtle rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary-text">Start a conversation</DialogTitle>
            <DialogDescription>
              Share your name and a bit about your project. I’ll get back to you soon.
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
                      <Input placeholder="Your name" className="rounded-lg" {...field} />
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
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#004E95] hover:bg-[#004E95]/90 rounded-lg"
                >
                  {isSubmitting ? "Sending…" : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
