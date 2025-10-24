export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
  
    const redirect = `cloutmate://oauth/callback?code=${code || ""}&state=${state || ""}`;
    return new Response(null, {
      status: 302,
      headers: { Location: redirect },
    });
  }