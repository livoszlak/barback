import { z } from "zod";

/**
 * Validates form data against a provided Zod schema.
 *
 * @param schema - The Zod schema to validate the form data against.
 * @param formData - The form data to validate, adhering to the schema's shape.
 * @returns An object containing:
 *   - `errors`: An object with field-specific error messages if validation fails.
 *   - `data`: The validated form data if validation succeeds, or `null` if validation fails.
 */
export const validateFormData = <T extends z.ZodTypeAny>(
  schema: T, // The Zod schema used for validation
  formData: z.infer<T> // The form data to be validated
) => {
  const validation = schema.safeParse(formData); // Perform validation

  if (!validation.success) {
    // If validation fails, flatten errors and return them along with null data
    const errors = validation.error.flatten().fieldErrors;
    return { errors, data: null };
  }

  // If validation is successful, return validated data and no errors
  return { errors: null, data: validation.data };
};
