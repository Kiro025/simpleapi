export async function GET() {
  return Response.json(
    {
      error: "Internal Server Error",
      message: "Something went wrong on the server side. This is a simulated 500 error.",
    },
    { status: 500 }
  );
}
