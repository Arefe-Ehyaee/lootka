// scripts/getRoutes.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.sitemap" });

// روت‌های استاتیک
export const staticRoutes: string[] = [
  "/",
  "/addForm",
  "/addPlace",
  "/branches",
  "/restaurants",
  "/cafes",
  "/hostels",
  "/attractions",
  "/planner",
  "/getPlanLanding",
  "/signUp",
  "/login",
  "/about",
];

// روت‌های داینامیک از API
export async function getDynamicRoutes(): Promise<string[]> {
  const routes: string[] = [];
  const BASE_URL = process.env.API_BASE_URL;
  if (!BASE_URL) throw new Error("API_BASE_URL تعریف نشده!");

  // گرفتن places (مثلاً ۱۰۰۰ تا اول)
  const res = await fetch(`${BASE_URL}/places/?limit=100&page=1`);
  if (!res.ok) {
    throw new Error("Failed to fetch places for sitemap");
  }
  const json = await res.json();

  json.data.forEach((p: any) => {
    routes.push(`/places/${p.place_id}`);
  });

  return routes;
}

// ترکیب استاتیک و داینامیک
export async function getAllRoutes(): Promise<string[]> {
  const dynamicRoutes = await getDynamicRoutes();
  return [...staticRoutes, ...dynamicRoutes];
}
