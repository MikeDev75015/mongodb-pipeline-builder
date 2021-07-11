/**
 * The interface that represent the contract for a paginated GetResult response
 */
export interface GetPagingResultResponse {
  /**
   * The method used to obtain the documents found
   * @constructor
   */
  GetDocs(): any[];

  /**
   * The method used to obtain the total number of documents found
   * @constructor
   */
  GetCount(): number;
}
