import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.ts";
import db from "../../db/connection.ts";
import { habits, habitTags } from "../../db/schema.ts";

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, frequency, targetCount, tagIds } = req.body;
    const userId = req.user!.id;

    // Inside transaction to ensure atomicity
    const result = await db.transaction(async (tx) => {
      // Create the habit
      const [newHabit] = await tx
        .insert(habits)
        .values({
          userId,
          name,
          description,
          frequency,
          targetCount,
        })
        .returning();

      // If there are tags, associate them with the habit
      if (tagIds && tagIds.length > 0) {
        const habitTagValues = tagIds.map((tagId: string) => ({
          habitId: newHabit.id,
          tagId,
        }));
        await tx.insert(habitTags).values(habitTagValues);
      }

      return newHabit;
    });
    res.status(201).json({
      message: "Habit created successfully",
      habit: result,
    });
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ error: "Failed to create habit" });
  }
};
