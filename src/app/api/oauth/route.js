export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const platform = searchParams.get("platform");

  // Platform-aware redirect with Notion OAuth added
  let redirect;
  switch (platform) {
    case "threads":
      redirect = `cloutmate://oauth/threads?code=${code || ""}&state=${state || ""}`;
      break;
    case "notion":
      redirect = `cloutmate://oauth/notion?code=${code || ""}&state=${state || ""}`;
      break;
    case "facebook":
    default:
      redirect = `cloutmate://oauth/facebook?code=${code || ""}&state=${state || ""}`;
      break;
  }

  return new Response(null, {
    status: 302,
    headers: { Location: redirect },
  });
}
