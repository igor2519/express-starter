class ApplicationError extends Error {
  constructor(public message: string, public status: number = 400, public payload?: object) {
    super();
  }
}

export default ApplicationError;
