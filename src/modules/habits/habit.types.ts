import z from "zod";

export const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(100, "Name too long"),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "monthly"], {
    error: "Frequency must be daily, weekly, or monthly",
  }),
  targetCount: z.number().int().positive().optional().default(1),
  tagIds: z.array(z.uuid()).optional(),
});
