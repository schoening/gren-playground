import fs from "fs";
import path from "path";
import { exec, spawn } from "child_process";
import dedent from "dedent";

export type FileData = {
  name: string;
  extension: string;
  content: string;
};

export const getFileNames = (directoryPath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (readDirError, files) => {
      if (readDirError) {
        return reject(readDirError);
      }
      return resolve(files);
    });
  });
};

export const getFiles = (
  directoryPath: string,
  fileNames: string[]
): Promise<FileData[]> => {
  return new Promise((resolve, reject) => {
    const fileDataArray: FileData[] = [];
    fileNames.forEach((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      fs.readFile(filePath, "utf-8", (fileReadError, data) => {
        if (fileReadError) {
          return reject(fileReadError);
        }
        const fileData = {
          name: fileName,
          extension: path.extname(fileName),
          content: data,
        };
        fileDataArray.push(fileData);
        if (fileDataArray.length === fileNames.length) {
          return resolve(fileDataArray);
        }
      });
    });
  });
};

export const deleteFolder = (pathToFolder: string): Promise<void> => {
  return new Promise((resolve, reject) => {
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
  });
};

export const deleteFile = (pathToFile: string): Promise<void> => {
  return new Promise((resolve, reject) => {
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
  });
};

export const createFolder = (directoryPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      return resolve();
    } catch (mkdirError) {
      return reject(mkdirError);
    }
  });
};

export const createFiles = (
  directoryPath: string,
  files: FileData[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let filesCreated = 0;
    files.forEach((file) => {
      const filePath = `${directoryPath}/${file.name}.${file.extension}`;
      // create a file inside the directory
      fs.writeFile(filePath, file.content, (writeFileError) => {
        console.log({ writeFileError });
        if (writeFileError) {
          return reject(writeFileError);
        }
        filesCreated += 1;

        if (filesCreated === files.length) {
          console.log(filesCreated === files.length);
          return resolve();
        }
      });
    });
  });
};

const createErrorFile = (
  directoryPath: string,
  error: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${directoryPath}/error.txt`, error, (writeFileError) => {
      if (writeFileError) {
        return reject(writeFileError);
      }
      console.log("Error file created successfully!");
      return resolve();
    });
  });
};

// export const save = async (directoryPath: string, files: FileData[]) => {
//   return new Promise(async (resolve, reject) => {
//     console.log("deleting src folder...");
//     // await deleteSrcFolder(folderName);

//     console.log("creating src folder...");
//     await createFolder(`${directoryPath}/src`);
//     console.log("creating files...");
//     await createFiles(`${directoryPath}/src`, files);
//     try {
//       console.log("deleting error.json...");
//       await deleteFile(directoryPath, "error.txt");
//     } catch (error) {
//       console.log(error);
//     }
//     try {
//       console.log("deleting gren.js...");
//       await deleteFile(directoryPath, "gren.js");
//     } catch (error) {
//       console.log(error);
//     }

//     try {
//       console.log("compiling...");
//       const compileResult = await compile(
//         directoryPath,
//         `${directoryPath}/src/Main.gren`
//       );
//       resolve(compileResult);
//     } catch (error) {
//       console.log({ error });
//       reject(error);
//     }
//   });
// };

// export const compile = (
//   directoryPath: string,
//   pathToMainGren: string
// ): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     exec(
//       `gren make ${pathToMainGren} --output=${directoryPath}/gren.js --debug`,
//       function (err, stout, stderr) {
//         if (err) {
//           try {
//             createErrorFile(directoryPath, stderr);
//             resolve("compile-error");
//           } catch (error) {
//             reject(error);
//           }
//         }
//         if (stout) {
//           resolve("success");
//         }
//         if (stderr) {
//           return reject(stderr);
//         }
//       }
//     );
//   });
// };

export const compile = (folderName: string): Promise<any> => {
  console.log("compiling...");
  return new Promise((resolve, reject) => {
    exec(
      `cd ./project/${folderName}/ && gren make ./src/Main.gren --output=./gren.js --debug`,
      function (err, stout, stderr) {
        if (err) {
          try {
            createErrorFile(`./project/${folderName}`, stderr);
            resolve("compile-error");
          } catch (error) {
            reject(error);
          }
        }
        if (stout) {
          resolve("success");
        }
        if (stderr) {
          return reject(stderr);
        }
      }
    );
  });
};

export const grenInit = async (folderName: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    console.log("gren init ...");

    var child = spawn(`cd ./project/${folderName} && gren init`, {
      shell: true,
    });
    child.stderr.on("data", function (data) {
      console.error("STDERR:", data.toString());
      resolve();
    });
    child.stdout.on("data", function (data) {
      console.log("STDOUT:", data.toString());
      child.stdin.write("Y");
      child.stdin.end();
    });
    child.on("exit", function (exitCode) {
      console.log("Child exited with code: " + exitCode);
      resolve();
    });

    // exec(`cd ./project/${folderName} && gren init`, (error, stdout, stderr) => {
    //   console.log({ error, stdout, stderr });
    //   if (error) {
    //     return reject(error);
    //   }
    //   if (stderr) {
    //     return reject(stderr);
    //   }
    //   if (stdout) {
    //     return resolve();
    //   }
    //   return resolve();
    // });

    // const grenJson: FileData = {
    //   name: "gren",
    //   extension: "json",
    //   content: dedent(`
    //     {
    //       "type": "application",
    //       "platform": "browser",
    //       "source-directories": [
    //           "src"
    //       ],
    //       "gren-version": "0.2.0",
    //       "dependencies": {
    //           "direct": {
    //               "gren-lang/browser": "2.0.0",
    //               "gren-lang/core": "3.0.2"
    //           },
    //           "indirect": {
    //               "gren-lang/url": "2.0.0"
    //           }
    //       }
    //   }`),
    // };

    // try {
    //   await createFiles(directoryPath, [grenJson]);
    //   console.log("resolve...");
    //   resolve();
    // } catch (error) {
    //   console.log({ error });
    //   reject(error);
    // }
  });
};
