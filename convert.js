const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Parse command-line arguments
const [, , inputFilePath] = process.argv;

if (!inputFilePath) {
  console.error("Usage: convert_to_webm <input-file> [output-file]");
  process.exit(1);
}

// =====================================================================================
//
// CONVERSION CODE
//
// =====================================================================================

(async function () {
  // const outputWebMPath = generateOutputPath(inputFilePath, "_400p", "webm");
  // await convertVideo(inputFilePath, outputWebMPath, getWebMConfig(400, false));

  // return;

  // disable webm output cuz its bigger than mp4 for some scenario
  const output1080pPath = generateOutputPath(inputFilePath, "_1080p", "mp4");
  await convertVideo(
    inputFilePath,
    output1080pPath,
    getMp4ConvertConfig({ resolution: 1080, keyframeDistance: 25 })
  );

  // disable webm output cuz its bigger than mp4 for some scenario
  const output720pPath = generateOutputPath(inputFilePath, "_720p", "mp4");
  await convertVideo(
    inputFilePath,
    output720pPath,
    getMp4ConvertConfig({ resolution: 720, keyframeDistance: 5 })
  );

  const output480pPath = generateOutputPath(inputFilePath, "_480p", "mp4");
  await convertVideo(
    inputFilePath,
    output480pPath,
    getMp4ConvertConfig({ resolution: 480, keyframeDistance: 5 })
  );

  const outputMobile = generateOutputPath(inputFilePath, "_mobile", "mp4");
  await convertVideo(
    inputFilePath,
    outputMobile,
    getMp4ConvertConfig({ resolution: 720, mobile: true, keyframeDistance: 5 })
  );
})();

// =====================================================================================
//
// UTILITIES
//
// =====================================================================================

function convertVideo(inputFilePath, outputFilePath, ffmpegArgsFactory) {
  return new Promise((resolve, reject) => {
    // Resolve paths to ensure they are properly formatted
    const inputFullPath = path.resolve(inputFilePath);
    const outputFullPath = path.resolve(outputFilePath);

    removeFileIfExistsSync(outputFullPath);

    // Build the FFmpeg command
    const ffmpegArgs = ffmpegArgsFactory(inputFullPath, outputFullPath);

    // Spawn the FFmpeg process
    const ffmpeg = spawn("ffmpeg", ffmpegArgs);

    // Capture and display stdout and stderr
    ffmpeg.stdout.on("data", (data) => {
      console.log(`FFmpeg stdout: ${data}`);
    });

    ffmpeg.stderr.on("data", (data) => {
      // FFmpeg typically outputs progress information to stderr
      console.log(`FFmpeg stderr: ${data}`);
    });

    ffmpeg.on("error", (error) => {
      reject(new Error(`Error during conversion: ${error.message}`));
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve(`Conversion completed successfully: ${outputFullPath}`);
      } else {
        reject(new Error(`FFmpeg process exited with code ${code}`));
      }
    });
  });
}

function generateOutputPath(
  inputFilePath,
  suffix = "_720p",
  newExtension = "webm"
) {
  const dir = path.dirname(inputFilePath);
  const ext = path.extname(inputFilePath);
  const fileNameWithoutExt = path.basename(inputFilePath, ext);
  return path.join(dir, `${fileNameWithoutExt}${suffix}.${newExtension}`);
}

function removeFileIfExistsSync(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted successfully");
    } else {
      console.log("No existing file to be deleted");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// =====================================================================================
//
// FACTORIES
//
// =====================================================================================

function getWebMConfig(resolution = 720, mobile = false) {
  let filter = getResizeFilter(resolution, mobile);
  return (inputFullPath, outputFullPath) => {
    const ffmpegArgs = [
      "-i",
      inputFullPath,
      "-vf",
      filter, // Scale while preserving aspect ratio
      "-an", // Remove audio
      "-c:v",
      "libvpx", // Use VP8 codec for WebM
      // "libvpx-vp9", // Use VP9 codec for WebM
      "-b:v",
      "500k", // Set bitrate to 1Mbps
      "-crf",
      "50", // Constant quality setting (lower values mean better quality)
      "-g",
      "250", // Set maximum interval between keyframes to 1 (keyframe every frame)
      outputFullPath,
    ];
    return ffmpegArgs;
  };
}

function getMp4ConvertConfig({
  resolution = 720,
  mobile = false,
  keyframeDistance = 1,
}) {
  return (inputFullPath, outputFullPath) => {
    let filter = getResizeFilter(resolution, mobile);

    const ffmpegArgs = [
      "-i",
      inputFullPath,
      "-vf",
      filter, // Apply the video filter
      "-an", // Remove audio
      "-c:v",
      "libx264", // Use H.264 codec for MP4
      "-b:v",
      "1M", // Set bitrate to 1Mbps
      "-crf",
      "23", // Constant quality setting (lower values mean better quality, typical range 18-28 for H.264)
      "-g",
      keyframeDistance, // Set maximum interval between keyframes to 25
      "-preset",
      "medium", // Set encoding speed vs quality trade-off (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
      "-threads",
      "4", // Use 4 threads
      outputFullPath,
    ];

    return ffmpegArgs;
  };
}

function getResizeFilter(resolution = 720, mobile = false) {
  let filter;
  if (mobile) {
    // Mobile-optimized settings: crop to 9:16 aspect ratio, then scale to desired mobile resolution
    const targetHeight = resolution; // Example height for mobile resolution, adjustable
    filter = `crop=in_h*9/16:in_h,scale=-2:${targetHeight}`;
  } else {
    // Standard settings for non-mobile
    filter = `scale=-2:${resolution}`;
  }
  return filter;
}
