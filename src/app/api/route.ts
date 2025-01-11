import { NextRequest, NextResponse } from "next/server";
import { TTool } from "../types";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error("Invalid Supabase keys");

const supabase = createClient(supabaseUrl, supabaseKey);
async function uploadFileToSupabase(file: File) {
  try {
    const bucketName = "pdfkit"; // Replace with your bucket name
    const filePath = `${Date.now()}-${file.name}`; // Unique file name

    // Upload the file to the bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    console.log("File uploaded successfully:", data);

    // Generate the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    console.log("Public URL:", publicUrl);

    // Return the public URL
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    console.log("formdata", formdata);

    const tool = JSON.parse(formdata.get("tool") as string) as TTool | null;
    const file = formdata.get("file") as File | null;

    if (!tool || !file) {
      return NextResponse.json(
        { error: "Invalid formdata: Missing tool or file" },
        { status: 400 }
      );
    }

    const publicKey = process.env.PUBLIC_KEY;
    const secretKey = process.env.SECRET_KEY;

    if (!publicKey || !secretKey)
      return NextResponse.json({ error: "Invalid API keys" });

    const ilovepdf = new ILovePDFApi(publicKey, secretKey);
    console.log(JSON.parse(formdata.get("tool") as string).taskType);

    const task = ilovepdf.newTask(tool.taskType);
    await task.start();

    if (formdata.get("mergingfile1")) {
      for (let i = 1; formdata.get(`mergingfile${i}`); i++) {
        const mergingfile = formdata.get(`mergingfile${i}`);
        console.log("addingFile", mergingfile);

        const fileURL = await uploadFileToSupabase(mergingfile as File);
        await task.addFile(fileURL);
      }
    }

    const fileURL = await uploadFileToSupabase(file);
    await task.addFile(fileURL);
    await task.process(
      tool.taskType === "protect"
        ? { password: formdata.get("password") }
        : tool.taskType === "split"
        ? { ranges: formdata.get("splitRange") }
        : {}
    );
    const data = await task.download();
    console.log("data", data);

    const blob = new Blob([data], { type: "application/pdf" });
    const arrayBuffer = await blob.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=compressed.pdf",
      },
    });
  } catch (error) {
    console.error("Error during conversion:", error);
    return NextResponse.json(
      { error: "An error occurred during conversion" },
      { status: 500 }
    );
  }
}
