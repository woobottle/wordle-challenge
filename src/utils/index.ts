export const getBackgroundColor = (status: string | undefined) => {
  if (status === undefined) return "";
  if (status === "absent") return "#3a3a3c";
  if (status === "mismatch") return "#b59f3b";
  return "#538d4e";
};
