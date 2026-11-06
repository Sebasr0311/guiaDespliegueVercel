import type { NextConfig } from 'next';

// For GitHub Pages project sites: set REPO_NAME to your GitHub repository name.
// For username.github.io repos or a custom root domain, leave REPO_NAME empty.
const repo = process.env.REPO_NAME?.trim() ?? '';
const basePath = repo ? `/${repo}` : '';
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {})
};
export default config;
