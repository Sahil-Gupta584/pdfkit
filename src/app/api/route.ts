import { TTool } from "@/app/types";
import {
  ServicePrincipalCredentials,
  PDFServices,
  MimeType,
  ExportPDFParams,
  ExportPDFTargetFormat,
  ExportPDFJob,
  ExportPDFResult,
  ExportPDFToImagesJob,
  ExportPDFToImagesTargetFormat,
  ExportPDFToImagesParams,
  ExportPDFToImagesOutputType,
  PageLayout,
  HTMLToPDFParams,
  HTMLToPDFJob,
  OCRJob,
  ProtectPDFParams,
  EncryptionAlgorithm,
  ProtectPDFJob,
  RemoveProtectionParams,
  RemoveProtectionJob,
  SplitPDFParams,
  SplitPDFJob,
  CombinePDFParams,
  CombinePDFJob,
  CompressPDFJob,
  ExportPDFToImagesResult,
  ExtractPDFResult,
  CreatePDFResult,
  CreatePDFJob,
  PageRanges,
  SplitPDFResult,
} from "@adobe/pdfservices-node-sdk";
import JSZip from "jszip";

import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const userPassword = formdata.get("userPassword");
    const password = formdata.get("password");
    const splitRange = formdata.get("splitRange") as string;
    const mergingFiles = formdata.getAll("mergingFiles");

    console.log("formdata", formdata);

    const tool = JSON.parse(formdata.get("tool") as string) as TTool | null;
    const file = formdata.get("file") as File | null;

    if (!tool || !(file || mergingFiles)) {
      return NextResponse.json(
        { error: "Invalid formdata: Missing tool or file" },
        { status: 400 }
      );
    }

    const credentials = new ServicePrincipalCredentials({
      clientId: process.env.PDF_SERVICES_CLIENT_ID as string,
      clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET as string,
    });
    const pdfServices = new PDFServices({ credentials });
    const buffer = file && Buffer.from(await file.arrayBuffer());
    const readStream = buffer && Readable.from(buffer);

    let inputAsset =
      readStream &&
      (await pdfServices.upload({
        readStream,
        mimeType:
          MimeType[
            `${
              tool.adobeMemeType ? tool.adobeMemeType : "PDF"
            }` as keyof typeof MimeType
          ],
      }));

    let job;
    switch (tool.handler) {
      case "docxpdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new CreatePDFJob({
          inputAsset: inputAsset,
        });
        break;
      case "docpdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ExportPDFJob({
          inputAsset: inputAsset,
          params: new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.DOC,
          }),
        });

        break;
      case "pptxpdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ExportPDFJob({
          inputAsset: inputAsset,
          params: new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.PPTX,
          }),
        });
        break;
      case "rtfpdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ExportPDFJob({
          inputAsset: inputAsset,
          params: new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.RTF,
          }),
        });

        break;
      case "xlsxpdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ExportPDFJob({
          inputAsset: inputAsset,
          params: new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.XLSX,
          }),
        });

        break;
      case "pdfimg":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ExportPDFToImagesJob({
          inputAsset: inputAsset,
          params: new ExportPDFToImagesParams({
            targetFormat:
              tool.id === "pdf-to-png"
                ? ExportPDFToImagesTargetFormat.PNG
                : ExportPDFToImagesTargetFormat.JPEG,
            outputType: ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES,
          }),
        });
        break;

      case "htmlpdf":
        const htmlString = buffer && buffer.toString("utf-8");

        const zip = new JSZip();
        if (htmlString) zip.file("index.html", htmlString);

        const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
        const zipStream = Readable.from(zipBuffer);
        inputAsset = await pdfServices.upload({
          readStream: zipStream,
          mimeType: MimeType.ZIP,
        });
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new HTMLToPDFJob({
          inputAsset: inputAsset,
          params: new HTMLToPDFParams({
            pageLayout: new PageLayout({ pageHeight: 11.5, pageWidth: 8 }),
            includeHeaderFooter: true,
          }),
        });

        break;
      case "pdfocr":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new OCRJob({ inputAsset: inputAsset });

        break;
      case "lockpdf":
        if (typeof userPassword !== "string")
          throw new Error("userPassword is required");
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new ProtectPDFJob({
          inputAsset: inputAsset,
          params: new ProtectPDFParams({
            userPassword: userPassword,
            encryptionAlgorithm: EncryptionAlgorithm.AES_256,
          }),
        });

        break;
      case "unlockpdf":
        if (typeof password !== "string")
          throw new Error("password is required");

        if (!inputAsset) throw new Error("Input asset is required.");
        job = new RemoveProtectionJob({
          inputAsset: inputAsset,
          params: new RemoveProtectionParams({ password }),
        });

        break;
      case "splitpdf":
        if (!splitRange) throw new Error("splitRange is required");
        if (!inputAsset) throw new Error("Input asset is required.");
        const pageRanges = new PageRanges();
        const range = splitRange.split("-");
        pageRanges.addRange(+range[0], +range[1]);
        job = new SplitPDFJob({
          inputAsset: inputAsset,
          params: new SplitPDFParams({ pageRanges }),
        });

        break;
      case "mergepdf":
        console.log("mergingFiles", mergingFiles);

        if (!mergingFiles || mergingFiles.length < 2)
          throw new Error("At least two mergingFiles are required");

        const nodeStreams = await Promise.all(
          mergingFiles.map(async (file) => {
            if (!(file instanceof File))
              throw new Error("All mergingFiles must be files");

            const buffer = Buffer.from(await file.arrayBuffer());
            return Readable.from(buffer);
          })
        );

        const assets = await pdfServices.uploadAssets({
          streamAssets: nodeStreams.map((s) => ({
            readStream: s,
            mimeType: MimeType.PDF,
          })),
        });
        const params = new CombinePDFParams();
        assets.forEach((a) => params.addAsset(a));
        job = new CombinePDFJob({
          params,
        });

        break;

      case "compresspdf":
        if (!inputAsset) throw new Error("Input asset is required.");
        job = new CompressPDFJob({ inputAsset: inputAsset });

        break;
    }

    if (!job) throw new Error("Failed to get job");
    const pollingURL = await pdfServices.submit({ job });

    function getResultTypeForHandler(
      handler: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): new (...args: any[]) => any {
      switch (handler) {
        case "pdfimg":
          return ExportPDFToImagesResult;
        case "extractpdf":
          return ExtractPDFResult;
        case "docxpdf":
          return CreatePDFResult;
        case "splitpdf":
          return SplitPDFResult;
        default:
          return ExportPDFResult;
      }
    }

    const resultType = getResultTypeForHandler(tool.handler);

    const pdfServicesResponse = await pdfServices.getJobResult({
      pollingURL,
      resultType,
    });

    if (!pdfServicesResponse.result) throw "Failed to get job result";

    let resultAsset = pdfServicesResponse.result.asset;
    let outputBuffer;

    if (tool.handler === "pdfimg" || tool.handler === "splitpdf") {
      // if (resultAsset. || tool.handler === "splitpdf") {
      resultAsset = pdfServicesResponse.result.assets;
      console.log("resultAsset", JSON.stringify(resultAsset));
      const url = JSON.parse(JSON.stringify(resultAsset))[0]._downloadURI;
      console.log("url", url);

      const res = await fetch(url);
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      outputBuffer = Buffer.from(arrayBuffer);
    }

    if (!outputBuffer) {
      const streamAsset = await pdfServices.getContent({ asset: resultAsset });
      outputBuffer = await streamToBuffer(streamAsset.readStream);
    }

    let contentType = "application/pdf";

    switch (tool.handler) {
      case "pdfdocx":
        contentType = "application/msword";
        break;

      case "pdfimg":
        contentType = "application/zip";
        break;
    }
    console.log({ contentType, file });

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=pdfkit`,
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
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) =>
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    );
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
