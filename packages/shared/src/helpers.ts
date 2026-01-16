/**
 * Helper constants for schema derivation
 *
 * Use these with Zod's .omit() method when creating input schemas
 * to exclude auto-generated fields from user input.
 */

/**
 * Fields automatically managed by Prisma that should be excluded from create/update inputs.
 *
 * @example
 * ```typescript
 * // Create input schema - omit auto-generated fields
 * const CaseCreateInputSchema = CaseSchema.omit({
 *   ...PRISMA_AUTO_FIELDS,
 *   caseNumber: true, // also auto-generated
 * });
 *
 * // Update input schema - partial fields, excluding auto-fields
 * const CaseUpdateInputSchema = CaseSchema.omit({
 *   ...PRISMA_AUTO_FIELDS,
 * }).partial();
 * ```
 */
export const PRISMA_AUTO_FIELDS = {
  id: true,
  createdAt: true,
  updatedAt: true,
} as const;

/**
 * Type for PRISMA_AUTO_FIELDS keys
 */
export type PrismaAutoFieldKeys = keyof typeof PRISMA_AUTO_FIELDS;
