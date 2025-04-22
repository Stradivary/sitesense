export class SalesforceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'SalesforceError';
  }

  static getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'Invalid Record Type. Must be "API Insight", "Consultative", "TSurvey", or "AnaaS"';
      case 401:
        return 'Invalid Lead Source. Must be "Website Tsurvey", "Website Digihub", or "Website Cascade"';
      case 500:
        return 'Failed to create lead. Please try again later.';
      default:
        return 'An unexpected error occurred';
    }
  }
}
