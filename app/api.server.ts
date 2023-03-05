import fs from "fs";
import path from "path";
import { exec, spawn } from "child_process";
import dedent from "dedent";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";

export type FileData = {
  name: string;
  extension: string;
  content: string;
};

// Get the file names in the directory
export const getFileNames = (
  directoryPath: string
): TE.TaskEither<Error, string[]> =>
  TE.tryCatch(
    () =>
      new Promise<string[]>((resolve, reject) => {
        fs.readdir(directoryPath, (readDirError, files) => {
          if (readDirError) {
            return reject(readDirError);
          }
          return resolve(files);
        });
      }),
    (reason) => new Error(String(reason))
  );

// Get the file data from the file names
export const getFiles = (
  directoryPath: string,
  fileNames: string[]
): TE.TaskEither<Error, FileData[]> =>
  TE.tryCatch(
    () =>
      new Promise<FileData[]>((resolve, reject) => {
        const fileDataArray: FileData[] = [];
        if (fileNames.length === 0) {
          return reject(
            new Error(
              'No files found in the directory (Folder MUST contain "Main.gren" file)'
            )
          );
        }
        fileNames.forEach((fileName) => {
          const filePath = path.join(directoryPath, fileName);
          fs.readFile(filePath, "utf-8", (fileReadError, data) => {
            if (fileReadError) {
              return reject(fileReadError);
            }
            const fileData = {
              name: path.parse(fileName).name,
              extension: path.extname(fileName),
              content: data,
            };
            fileDataArray.push(fileData);
            if (fileDataArray.length === fileNames.length) {
              return resolve(fileDataArray);
            }
          });
        });
      }),
    (reason) => new Error(String(reason))
  );

// Delete the folder with the given path
export const deleteFolder = (
  pathToFolder: string
): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        exec(`rm -rf ${pathToFolder}`, (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          if (stderr) {
            return reject(stderr);
          }
          if (stdout) {
            return resolve();
          }
          resolve();
        });
      }),
    (reason) => new Error(String(reason))
  );

// Delete the file with the given path
export const deleteFile = (pathToFile: string): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        exec(`rm ${pathToFile}`, (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          if (stderr) {
            return reject(stderr);
          }
          if (stdout) {
            return resolve();
          }
          return resolve();
        });
      }),
    (reason) => new Error(String(reason))
  );

// Create a folder with the given path
export const createFolder = (
  directoryPath: string
): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        try {
          fs.mkdirSync(directoryPath, { recursive: true });
          return resolve();
        } catch (mkdirError) {
          return reject(mkdirError);
        }
      }),
    (reason) => new Error(String(reason))
  );

// Create a file with the given path
export const createFile = (
  directoryPath: string,
  file: FileData
): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        const filePath = `${directoryPath}/${file.name}.${file.extension}`;
        // create a file inside the directory
        fs.writeFile(filePath, file.content, (writeFileError) => {
          if (writeFileError) {
            return reject(writeFileError);
          }
          return resolve();
        });
      }),
    (reason) => new Error(String(reason))
  );

// Create files with the given path
export const createFiles = (
  directoryPath: string,
  files: FileData[]
): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        Promise.all(
          files.map(async (file) => {
            const createFileEither = await createFile(directoryPath, file)();
            if (E.isLeft(createFileEither)) {
              return reject(createFileEither.left);
            }
            if (E.isRight(createFileEither)) {
              return resolve();
            }
          })
        );
      }),
    (reason) => new Error(String(reason))
  );

// Create an error.txt file at the given path
export const createErrorFile = (
  directoryPath: string,
  error: string
): TE.TaskEither<Error, void> => {
  const path = `${directoryPath}`;
  const errorFile: FileData = {
    name: "error",
    extension: "txt",
    content: error,
  };
  return createFile(path, errorFile);
};

export enum CompileResult {
  Success = "Success",
  WithErrors = "WithErrors",
}

// Compile the gren project with the given folder name
// Using Main.gren as the entry point
export const compile = (
  folderName: string
): TE.TaskEither<Error, CompileResult> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        exec(
          `cd ./project/${folderName}/ && gren make ./src/Main.gren --output=./gren.js --debug`,
          async function (err, stout, stderr) {
            if (err) {
              const createErrorFileEither = await createErrorFile(
                `./project/${folderName}`,
                stderr
              )();
              if (E.isLeft(createErrorFileEither)) {
                return reject(createErrorFileEither.left);
              }
              if (E.isRight(createErrorFileEither)) {
                return resolve(CompileResult.WithErrors);
              }
            }
            if (stout) {
              resolve(CompileResult.Success);
            }
            if (stderr) {
              return reject(stderr);
            }
          }
        );
      }),
    (reason) => new Error(String(reason))
  );

// Initialize the gren project with the given folder name
export const grenInit = (folderName: string): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        var child = spawn(`cd ./project/${folderName} && gren init`, {
          shell: true,
        });
        child.stderr.on("data", function (data) {
          reject(data.toString());
        });
        child.stdout.on("data", function (data) {
          child.stdin.write("Y");
          child.stdin.end();
        });
        child.on("exit", function (exitCode) {
          console.log("Child exited with code: " + exitCode);
          resolve();
        });
      }),
    (reason) => new Error(String(reason))
  );
