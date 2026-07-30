import mammoth from 'mammoth';

export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (!result.value || !result.value.trim()) {
      throw new Error('No readable text found in DOCX file.');
    }

    return result.value.trim();
  } catch (error: any) {
    console.error('Error parsing DOCX:', error);
    throw new Error(`Failed to extract text from DOCX: ${error.message || 'Unknown error'}`);
  }
}
