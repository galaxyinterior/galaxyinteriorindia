import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const MAX_UPLOAD_SIZE_BYTES = 1 * 1024 * 1024;

export function validateImageFile(file: File | null) {
  if (!file) {
    return "Please select an image file.";
  }

  if (!file.type.startsWith("image/")) {
    return "Only image files are allowed.";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "Image must be 1 MB or smaller.";
  }

  return "";
}

export async function uploadImageToStorage(file: File, folder: string) {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

export async function uploadImagesToStorage(files: File[], folder: string) {
  const urls: string[] = [];
  for (const file of files) {
    const error = validateImageFile(file);
    if (error) {
      throw new Error(error);
    }
    urls.push(await uploadImageToStorage(file, folder));
  }
  return urls;
}
