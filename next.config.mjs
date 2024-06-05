/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: false,

  // ====================================================================================
  // for next-image-export-optimizer
  // ====================================================================================
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",

    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: "true",

    // If you want to cache the remote images, you can set the time to live of the cache in seconds.
    // The default value is 0 seconds.
    nextImageExportOptimizer_remoteImageCacheTTL: "0",
  },
  // ====================================================================================
  // ====================================================================================

  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/privacy.html",
        permanent: false,
      },
      {
        source: "/join",
        destination: "/join.html",
        permanent: false,
      },
      {
        source: "/manifesto",
        destination: "/manifesto.html",
        permanent: false,
      },
      {
        source: "/biomarkers",
        destination: "/biomarkers.html",
        permanent: false,
      },
      {
        source: "/detail_biomarkers",
        destination: "/detail_biomarkers.html",
        permanent: false,
      },
      {
        source: "/detail_invite",
        destination: "/detail_invite.html",
        permanent: false,
      },
      {
        source: "/detail_services",
        destination: "/detail_services.html",
        permanent: false,
      },
      {
        source: "/early-access",
        destination: "/early-access.html",
        permanent: false,
      },
      {
        source: "/how-it-works",
        destination: "/how-it-works.html",
        permanent: false,
      },
      {
        source: "/invest",
        destination: "/invest.html",
        permanent: false,
      },
      {
        source: "/join-a-10x-team",
        destination: "/join-a-10x-team.html",
        permanent: false,
      },
      {
        source: "/medical-group-notice-of-privacy-practices",
        destination: "/medical-group-notice-of-privacy-practices.html",
        permanent: false,
      },
      {
        source: "/medical-group-of-informed-consent",
        destination: "/medical-group-of-informed-consent.html",
        permanent: false,
      },
      {
        source: "/medical-informed-consent-enclomiphene-treatment",
        destination: "/informed-consent-enclomiphene-treatment.html",
        permanent: false,
      },
      {
        source: "/medical-informed-consent-intranasal-nad",
        destination: "/informed-consent-intranasal-nad.html",
        permanent: false,
      },
      {
        source: "/medical-informed-consent-low-dose-naltrexone-treatment",
        destination: "/informed-consent-low-dose-naltrexone-treatment.html",
        permanent: false,
      },
      {
        source: "/medical-informed-consent-tadalafil-treatment",
        destination: "/informed-consent-low-dose-tadalafil-treatment.html",
        permanent: false,
      },
      {
        source: "/partners",
        destination: "/partners.html",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/services.html",
        permanent: false,
      },
      {
        source: "/support",
        destination: "/support.html",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/terms.html",
        permanent: false,
      },
      {
        source: "/tretinoin-medical-informed-consent",
        destination: "/tretinoin-medical-informed-consent.html",
        permanent: false,
      },
      {
        source: "/waitlist",
        destination: "/waitlist.html",
        permanent: false,
      },
    ];
  },
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",
};

export default nextConfig;
