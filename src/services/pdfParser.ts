import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    
    let extractedText = '';
    const numPages = pdfDocument.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      extractedText += `--- Page ${pageNum} ---\n` + pageText + '\n\n';
    }

    if (!extractedText.trim()) {
      throw new Error('No readable text found in PDF. It might be scanned or image-only.');
    }

    return extractedText.trim();
  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message || 'Unknown error'}`);
  }
}
