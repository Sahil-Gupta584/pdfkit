'use server';
import {
  ServicePrincipalCredentials,
  PDFServices,
  MimeType,
  ExportPDFParams,
  ExportPDFTargetFormat,
  ExportPDFJob,
  ExportPDFResult
} from "@adobe/pdfservices-node-sdk";
import { Readable } from "stream";
import { TTool } from "../types";

export async function handleConversion(tool: TTool, inputFile: Buffer): Promise<Buffer | null> {
  let readStream: Readable | undefined;
  console.log({tool,inputFile});
  
  try {
    if (!process.env.PDF_SERVICES_CLIENT_SECRET || !process.env.PDF_SERVICES_CLIENT_ID) {
      throw new Error("Missing PDF Services credentials in environment variables.");
    }
console.log(process.env.PDF_SERVICES_CLIENT_SECRET,process.env.PDF_SERVICES_CLIENT_ID,'envs');

    // Create credentials instance
    const credentials = new ServicePrincipalCredentials({
      clientId: process.env.PDF_SERVICES_CLIENT_ID,
      clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
    });

    // Create PDF Services instance
    const pdfServices = new PDFServices({ credentials });

    readStream = Readable.from(inputFile);

    const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.PDF
    });

    // Determine target format based on tool configuration
    const targetFormat = tool.fileExportType.toLowerCase() as ExportPDFTargetFormat;

    // Create job parameters for the conversion
    const params = new ExportPDFParams({ targetFormat });

    // Create and submit the conversion job
    const job = new ExportPDFJob({ inputAsset, params });
    const pollingURL = await pdfServices.submit({ job });

    // Fetch the conversion result
    const pdfServicesResponse = await pdfServices.getJobResult({
      pollingURL,
      resultType: ExportPDFResult
    });
    console.log('pdfServicesResponse',pdfServicesResponse);
    
    // Retrieve the resulting content as a stream
    const resultAsset = pdfServicesResponse.result.asset;
    const streamAsset = await pdfServices.getContent({ asset: resultAsset });

    // Read the content from the stream and return it as a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of streamAsset.readStream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  } catch (err) {
    console.error("Error during conversion:", err);
    return null;
  } finally {
    // Clean up resources
    readStream?.destroy();
  }
}
