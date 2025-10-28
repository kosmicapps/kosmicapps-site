export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  let platform = searchParams.get("platform");

  // Extract platform from state if not provided directly
  // Format: "platform:cloutmate_platform_abc123"
  if (!platform && state) {
    const stateMatch = state.match(/^([^:]+):/);
    if (stateMatch) {
      platform = stateMatch[1];
    }
  }

  let redirect;
  switch (platform) {
    case "notion":
      redirect = `cloutmate://oauth/notion?code=${code || ""}&state=${state || ""}`;
      break;
    case "threads":
      redirect = `cloutmate://oauth/threads?code=${code || ""}&state=${state || ""}`;
      break;
    case "facebook":
    default:
      redirect = `cloutmate://oauth/facebook?code=${code || ""}&state=${state || ""}`;
      break;
  }

  return new Response(null, { status: 302, headers: { Location: redirect } });
}