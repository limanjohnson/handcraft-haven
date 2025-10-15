import { NextResponse } from "next/server";
import { UTApi, UploadThingError } from "uploadthing/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // New v7+ usage: reads UPLOADTHING_TOKEN automatically
    const utApi = new UTApi();

    const uploadResponse = await utApi.uploadFiles([file]);

    if (!uploadResponse || !uploadResponse[0]?.data?.url) {
      throw new UploadThingError("Failed to upload file");
    }

    const fileUrl = uploadResponse[0].data.url;

    return NextResponse.json({ image_url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
