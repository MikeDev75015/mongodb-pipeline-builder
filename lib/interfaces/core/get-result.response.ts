/**
 * The interface that represent the contract for a default GetResult response
 */
export interface GetResultResponse {
  /**
   * The method used to obtain the documents found
   * @param element Optional. Contains the index of the desired element or 'last' for the last element
   * @constructor
   */
  GetDocs(element?: number | 'last'): any[] | any;
  
  /**
   * The method used to obtain the total number of documents found
   * @constructor
   */
  GetCount(): number;
}
