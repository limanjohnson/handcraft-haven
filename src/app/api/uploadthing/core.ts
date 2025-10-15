import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.url);
      // You can save `file.url` in your database if needed
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
