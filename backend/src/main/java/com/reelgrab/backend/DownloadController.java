package com.reelgrab.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DownloadController {

    private final YtDlpService ytDlpService;

    public DownloadController(YtDlpService ytDlpService) {
        this.ytDlpService = ytDlpService;
    }

    @PostMapping("/resolve")
    public ResolveResponse resolve(@RequestBody ResolveRequest request) throws Exception {
        String title = ytDlpService.getVideoTitle(request.url());
        return new ResolveResponse(title);
    }

    @PostMapping("/download")
public org.springframework.http.ResponseEntity<org.springframework.core.io.Resource> download(
        @RequestBody ResolveRequest request) throws Exception {

    java.io.File file = ytDlpService.downloadVideo(request.url());
    org.springframework.core.io.Resource resource = new org.springframework.core.io.FileSystemResource(file);

    return org.springframework.http.ResponseEntity.ok()
            .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + file.getName() + "\"")
            .contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM)
            .contentLength(file.length())
            .body(resource);
}

    public record ResolveRequest(String url) {}
    public record ResolveResponse(String title) {}
}