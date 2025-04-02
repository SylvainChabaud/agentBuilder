export const getInitParams = (fields, files) => {
  const objectiveText = fields.objective;

  const userId = Array.isArray(fields.userId)
    ? fields.userId[0]
    : fields.userId;

  const contextFiles = Array.isArray(files.files)
    ? files.files
    : files.files
      ? [files.files]
      : [];

  const simplifiedFiles = contextFiles.map((f) => ({
    name: f.originalFilename,
    path: f.filepath,
  }));

  return { userId, objectiveText, contextFiles: simplifiedFiles };
};
