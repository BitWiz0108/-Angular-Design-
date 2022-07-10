export class Chunk {
  _id : string;
  chunkCount: number;
  chunkNumber: number;
  chunk: any;
  contentId: string;
  endToByte: number;
  startInByte: number;
  isLastChunk: boolean;
  references: any;
}
