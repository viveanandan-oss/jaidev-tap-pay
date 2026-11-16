
interface Env {
  DB: D1Database;
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      try {
        const result = await env.DB.prepare(
          "SELECT COUNT(*) AS total FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
        ).first<{ total: number }>();

        return Response.json({
          success: true,
          app: "JAIDEV TAP PAY",
          database: "connected",
          tables: result?.total ?? 0
        });
      } catch {
        return Response.json(
          {
            success: false,
            app: "JAIDEV TAP PAY",
            database: "connection_failed"
          },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
