import { v4 as uuid } from "uuid";
export const FileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log(file);
  if (!file) return callback(new Error("File is empty"), false);

  const fileExtension = file.originalname.split(".").pop();

  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
