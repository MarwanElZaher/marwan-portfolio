// At the top of src/app/projects/[slug]/page.tsx
// Or in a separate utility file if preferred

export async function getResolvedSlug(
  paramSlug: string | { slug: string } | Promise<string | { slug: string }>
): Promise<string | null> {
  const resolvedParamSlug = await Promise.resolve(paramSlug); // Ensure any top-level Promise is resolved

  if (typeof resolvedParamSlug === 'object' && resolvedParamSlug !== null && 'slug' in resolvedParamSlug) {
    return resolvedParamSlug.slug; // Extract from object
  } else if (typeof resolvedParamSlug === 'string') {
    return resolvedParamSlug; // Already a string
  }
  return null; // Unexpected type
}