// vite-plugin-admin.js
import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), "src/data/json");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const ADMIN_PIN = process.env.VITE_ADMIN_PIN || "admin123";

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export default function adminApiPlugin() {
  return {
    name: "vite-plugin-portfolio-admin-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Sirf /api/admin routes ko pakarna hai
        if (!req.url.startsWith("/api/admin")) {
          return next();
        }

        try {
          const url = new URL(req.url, "http://localhost");
          const pathname = url.pathname;

          // 1. PIN Authentication Endpoint
          if (pathname === "/api/admin/auth" && req.method === "POST") {
            const { pin } = await parseRequestBody(req);
            if (pin === ADMIN_PIN) {
              return sendJson(res, 200, {
                success: true,
                token: "portfolio-admin-session",
              });
            }
            return sendJson(res, 401, {
              success: false,
              message: "Invalid Admin PIN!",
            });
          }

          // 2. Image / File Upload Endpoint
          if (pathname === "/api/admin/upload" && req.method === "POST") {
            const { filename, targetFolder, base64Data } =
              await parseRequestBody(req);
            if (!filename || !base64Data) {
              return sendJson(res, 400, {
                success: false,
                message: "Missing file data",
              });
            }

            const targetDir = path.join(
              PUBLIC_DIR,
              targetFolder || "images/uploads",
            );
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            const cleanBase64 = base64Data.replace(
              /^data:([A-Za-z-+/]+);base64,/,
              "",
            );
            const filePath = path.join(targetDir, filename);
            fs.writeFileSync(filePath, Buffer.from(cleanBase64, "base64"));

            const publicUrl = `/${path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/")}`;
            return sendJson(res, 200, { success: true, url: publicUrl });
          }

          // 3. Reorder Endpoint (e.g. /api/admin/reorder/projects)
          if (
            pathname.startsWith("/api/admin/reorder/") &&
            req.method === "POST"
          ) {
            const resource = pathname.replace("/api/admin/reorder/", "");
            const filePath = path.join(DATA_DIR, `${resource}.json`);

            if (!fs.existsSync(filePath)) {
              return sendJson(res, 404, {
                success: false,
                message: "File not found",
              });
            }

            const { reorderedList } = await parseRequestBody(req);
            if (!Array.isArray(reorderedList)) {
              return sendJson(res, 400, {
                success: false,
                message: "reorderedList must be an array",
              });
            }

            // Explicit 1-based order assign karein
            const normalized = reorderedList.map((item, index) => ({
              ...item,
              order: index + 1,
            }));

            fs.writeFileSync(
              filePath,
              JSON.stringify(normalized, null, 2),
              "utf-8",
            );
            return sendJson(res, 200, {
              success: true,
              count: normalized.length,
            });
          }

          // 4. Data Read Endpoint (GET /api/admin/data/:resource)
          if (pathname.startsWith("/api/admin/data/") && req.method === "GET") {
            const resource = pathname.replace("/api/admin/data/", "");
            const filePath = path.join(DATA_DIR, `${resource}.json`);

            if (!fs.existsSync(filePath)) {
              return sendJson(res, 404, {
                success: false,
                message: `Resource ${resource} not found`,
              });
            }

            const fileContent = fs.readFileSync(filePath, "utf-8");
            return sendJson(res, 200, {
              success: true,
              data: JSON.parse(fileContent),
            });
          }

          // 5. Data Write/Save Endpoint (POST /api/admin/data/:resource)
          if (
            pathname.startsWith("/api/admin/data/") &&
            req.method === "POST"
          ) {
            const resource = pathname.replace("/api/admin/data/", "");
            const filePath = path.join(DATA_DIR, `${resource}.json`);

            const { data } = await parseRequestBody(req);
            if (!data) {
              return sendJson(res, 400, {
                success: false,
                message: "No data provided",
              });
            }

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
            return sendJson(res, 200, {
              success: true,
              message: `${resource}.json updated on disk!`,
            });
          }

          return sendJson(res, 404, {
            success: false,
            message: "Endpoint not found",
          });
        } catch (err) {
          console.error("[Admin API Error]:", err);
          return sendJson(res, 500, { success: false, error: err.message });
        }
      });
    },
  };
}
