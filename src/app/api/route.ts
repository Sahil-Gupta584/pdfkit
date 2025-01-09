import { NextRequest, NextResponse } from "next/server";
import { handleConversion } from "../utils/conversionHandlers";
import { TTool } from "../types";

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
    const secon = new FormData();
    secon.append("file", 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

    const res = await fetch("https://apdf.io/api/pdf/file/compress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer soRbHjnirHGvOv9HwIVEJBNcPVL78Um3dA2FVFcw8ad8584b`,
      },
      body:JSON.stringify( {file:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}),
    });

    console.log("res", res);
    console.log("resParse", await res.json());

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const resultBuffer = await handleConversion(tool, fileBuffer);

    return NextResponse.json(
      { message: "Conversion successful", result: resultBuffer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during conversion:", error);
    return NextResponse.json(
      { error: "An error occurred during conversion" },
      { status: 500 }
    );
  }
}
