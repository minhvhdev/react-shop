export default interface IEmailParams extends Record<string, unknown> {
  fromDate: string;
  message: string;
}
