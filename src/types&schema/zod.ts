import { z } from "zod";

export const managerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type Manager = z.infer<typeof managerSchema>;

export const organizationSchema = z.object({
  organizationName: z.string(),
  userId: z.number(),
  accessCode: z.number().min(4),
  greeting: z.string(),
  //TODO: Set limit for how long a greeting can be.
});

export type Organization = z.infer<typeof organizationSchema>;

export const classicSchema = z.object({
  name: z.string(),
  recipe: z.object({
    ingredients: z.array(
      z.object({
        ingredientName: z.string(),
        measurement: z.number(),
        unit: z.string(),
      })
    ),
    method: z.string(),
    glass: z.string(),
    garnish: z.object({
      ingredients: z.array(
        z.object({
          garnishName: z.string(),
          discard: z.boolean(),
        })
      ),
    }),
    tastingNotes: z.array(z.string()),
    info: z.string(),
    imageURL: z.string().url().optional(),
  }),
});

export type Classic = z.infer<typeof classicSchema>;

export const seasonalSchema = z.object({
  organizationId: z.number(),
  isActive: z.boolean(),
  name: z.string(),
  recipe: z.object({
    ingredients: z.array(
      z.object({
        ingredientName: z.string(),
        measurement: z.number(),
        unit: z.string(),
        isPrep: z.boolean(),
      })
    ),
  }),
  method: z.string(),
  glass: z.string(),
  garnish: z.object({
    ingredients: z.array(
      z.object({
        garnishName: z.string(),
        discard: z.boolean(),
      })
    ),
  }),
  tastingNotes: z.array(z.string()),
  info: z.string(),
  imageURL: z.string().url().optional(),
  needsPrep: z.boolean(),
});

export type Seasonal = z.infer<typeof seasonalSchema>;

export const prepSchema = z.object({
  seasonalId: z.number(),
  name: z.string(),
  recipe: z.object({
    ingredients: z.array(
      z.object({
        ingredientName: z.string(),
        measurement: z.number(),
        unit: z.string(),
      })
    ),
  }),
  instructions: z.string(),
});

export type Prep = z.infer<typeof prepSchema>;
