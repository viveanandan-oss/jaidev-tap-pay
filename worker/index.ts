
interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/api/health") {
      return Response.json({
        success: true,
        app: "JAIDEV TAP PAY",
        status: "Backend starting"
      });
    }

    // Serve the application
    return env.ASSETS.fetch(request);
  }
};
