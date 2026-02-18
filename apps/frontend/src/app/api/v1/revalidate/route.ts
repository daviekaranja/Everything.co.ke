// import { revalidatePath } from "next/cache";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const { path, secret } = await request.json();

//   if (secret !== process.env.REVALIDATE_SECRET) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Purge the specific service page and the main list
//   revalidatePath(path);
//   revalidatePath("/services");

//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { path, secret } = await request.json();

  // 1. Validate the secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // 2. Revalidate by path (e.g., /services/tax-returns)
    if (path) {
      revalidatePath(path);
      // Also revalidate the sitemap to ensure the new link appears
      revalidatePath("/sitemap.xml");
    }

    // 3. Revalidate by tag (if you used fetch tags in your app)
    // if (tag) {
    //   revalidateTag(tag);
    // }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
