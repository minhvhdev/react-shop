export default interface IPost {
  id: number;
  title: string;
  mainImgLink: string;
  numView: number;
  content: string;
  createDate: string | Date;
}
