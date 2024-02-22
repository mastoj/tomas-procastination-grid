import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmployeeRecord } from "./types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  allocationPercentage: z.coerce.number().int().min(0).max(100),
  allocationHours: z.coerce.number().int().min(0).max(100),
  project: z.string(),
  role: z.enum(["Developer", "Designer", "Manager"]),
});

type Props = {
  record: EmployeeRecord;
  setAction: React.Dispatch<React.SetStateAction<EmployeeRecord[]>>;
  close: () => void;
};

const EmployeeEditForm = ({ record, setAction }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...record,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setAction((prev) =>
      prev.map((item) => (item.id === record.id ? values : item))
    );
    close();
    toast("Employee updated");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Marius Rødde" {...field} />
              </FormControl>
              <FormDescription>Employee</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input placeholder="Project X" {...field} />
              </FormControl>
              <FormDescription>Project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allocationPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation (%)</FormLabel>
              <FormControl>
                <Input placeholder="23" {...field} type="number" />
              </FormControl>
              <FormDescription>Allocation (%)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allocationHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation (hrs)</FormLabel>
              <FormControl>
                <Input placeholder="23" {...field} type="number" />
              </FormControl>
              <FormDescription>Allocation (hrs)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EmployeeEditForm;
