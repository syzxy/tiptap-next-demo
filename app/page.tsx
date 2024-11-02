import { redirect } from "next/navigation";

export default function Home() {
  // TODO: auth
  const workspace = "yunze";
  redirect(`${workspace}`);
  return null;
}
