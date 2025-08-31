import mime from 'mime';

export const makeAssetFormData = (uri: string) => {
  const formData = new FormData();
  // Note: This format is specific to React Native
  // For web, this would need to be converted to a Blob
  formData.append('file', {
    uri: uri,
    name: uri.split('/').pop() || 'file',
    type: mime.getType(uri) || 'application/octet-stream',
  } as unknown as Blob);

  return formData;
};
