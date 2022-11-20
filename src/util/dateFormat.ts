import { format } from "date-fns";

export function dateFormat(dateStr: string) {
  return format(new Date(dateStr), "yyyy/MM/dd");
}
