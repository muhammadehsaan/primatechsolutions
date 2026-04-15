import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "primatech/blogs";

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      {
        message: "Cloudinary config missing hai. `CLOUDINARY_CLOUD_NAME` aur `CLOUDINARY_UPLOAD_PRESET` set karein.",
      },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Image file required hai." }, { status: 400 });
  }

  const uploadBody = new FormData();
  uploadBody.append("file", file);
  uploadBody.append("upload_preset", uploadPreset);
  uploadBody.append("folder", folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadBody,
  });

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: payload?.error?.message || "Cloudinary upload failed.",
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    url: payload.secure_url,
    publicId: payload.public_id,
    width: payload.width,
    height: payload.height,
  });
}
