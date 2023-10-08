/**
 * The interface that represent the contract for a paginated GetResult response
 */
export type GetPagingResultResponse<T> = {
  /**
   * The method used to obtain the documents found
   * @constructor
   */
  GetDocs(): T[];

  /**
   * The method used to obtain the total number of documents found
   * @constructor
   */
  GetCount(): number;

  /**
   * The method used to obtain the total number of page
   * @returns the total page number or -1 if it fails to calculate
   * @constructor
   */
  GetTotalPageNumber(): number;
};
