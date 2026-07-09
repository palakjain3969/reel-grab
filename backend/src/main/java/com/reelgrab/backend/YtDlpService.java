package com.reelgrab.backend;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class YtDlpService {

    public String getVideoTitle(String url) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                "yt-dlp", "--print", "%(title)s", "--no-warnings", url
        );
        pb.redirectErrorStream(true);
        Process process = pb.start();

        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        process.waitFor();
        return output.toString().trim();
    }

    
    public java.io.File downloadVideo(String url) throws Exception {
    String fileId = java.util.UUID.randomUUID().toString();
    java.io.File outputDir = new java.io.File(System.getProperty("java.io.tmpdir"), "reelgrab");
    outputDir.mkdirs();
    String outputTemplate = new java.io.File(outputDir, fileId + ".%(ext)s").getAbsolutePath();

    ProcessBuilder pb = new ProcessBuilder(
            "yt-dlp",
            "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
            "--merge-output-format", "mp4",
            "--no-warnings",
            "-o", outputTemplate,
            url
    );
    pb.redirectErrorStream(true);
    Process process = pb.start();

    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(process.getInputStream()))) {
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println("[yt-dlp] " + line);
        }
    }

    int exitCode = process.waitFor();
    if (exitCode != 0) {
        throw new RuntimeException("yt-dlp failed with exit code " + exitCode);
    }

    java.io.File downloadedFile = new java.io.File(outputDir, fileId + ".mp4");
    if (!downloadedFile.exists()) {
        throw new RuntimeException("Download completed but output file not found");
    }
    return downloadedFile;
}
}