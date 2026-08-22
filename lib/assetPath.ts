export function assetPath(path: string) {
    const basePath =
      process.env.NODE_ENV === "production"
        ? "/sages-short-stories"
        : "";
  
    return `${basePath}${path}`;
  }