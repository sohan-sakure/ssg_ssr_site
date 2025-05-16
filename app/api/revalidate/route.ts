import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RevalidateRequestBody } from "@/utils/helper";

type RenderType = "page" | "layout" | undefined;
export async function POST(request: Request) {
  try {
    const { path, includeSiblings, includeAll }: RevalidateRequestBody =
      await request.json();
    let pathToRevalidate = path;
    let layout: RenderType = undefined;
    if (includeSiblings) {
      pathToRevalidate = "/blog/[id]";
      layout = "page";
    }
    if (includeAll) {
      pathToRevalidate = "/";
      layout = "layout";
    }
    // Validate the path
    console.log("Revalidating path:", pathToRevalidate);
    console.log("layout:", layout);
    if (layout !== undefined) {
      await revalidatePath(pathToRevalidate, layout);
    } else {
      await revalidatePath(pathToRevalidate);
    }
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.log("Error revalidating:", err);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

