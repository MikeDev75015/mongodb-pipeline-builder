/**
 * The interface that represent the contract for a default GetResult response
 */
export interface GetResultResponse<T> {
  /**
   * The method used to obtain the documents found
   * @constructor
   */
  GetDocs(): T[];

  /**
   * The method used to obtain only one element
   * @constructor
   * @param index
   */
  GetElement(index: number | 'last'): T;

  /**
   * The method used to obtain the total number of documents found
   * @constructor
   */
  GetCount(): number;
}
