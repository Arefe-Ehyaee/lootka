import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { getAllRoutes } from "./getRoutes";

// بارگذاری متغیرهای محیطی از .env.sitemap
import dotenv from "dotenv";
dotenv.config({ path: ".env.sitemap" });

async function generateSitemap() {
  const routes = await getAllRoutes();

  const sitemap = new SitemapStream({
    hostname: process.env.API_BASE_URL?.replace("/api", "") || "https://lootkatrip.ir",
  });

  routes.forEach((url) => {
    sitemap.write({ url, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  const xml = (await streamToPromise(sitemap)).toString();
  writeFileSync("./public/sitemap.xml", xml);

  console.log("✅ sitemap.xml ساخته شد!");
}

generateSitemap();
