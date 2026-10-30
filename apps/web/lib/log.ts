// Add genuine entries here when there is something to share. Dates use ISO 8601.
export type BuildEntry = {
  date: string;
  title: string;
  body: string;
  project?: string;
};
export const entries: BuildEntry[] = [];
