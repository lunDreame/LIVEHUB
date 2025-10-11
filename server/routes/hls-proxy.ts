import { RequestHandler } from "express";
import ffmpeg from "fluent-ffmpeg";
import { ChildProcess } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

// Active FFmpeg processes per channel
const activeStreams = new Map<string, {
    process: ChildProcess;
    outputDir: string;
    lastAccess: number;
}>();

// Cleanup interval - remove streams inactive for more than 5 minutes
setInterval(() => {
    const now = Date.now();
    const timeout = 5 * 60 * 1000; // 5 minutes

    for (const [slug, stream] of activeStreams.entries()) {
        if (now - stream.lastAccess > timeout) {
            console.log(`Cleaning up inactive stream: ${slug}`);
            try {
                stream.process.kill('SIGTERM');
            } catch (e) {
                console.error(`Error killing process for ${slug}:`, e);
            }
            try {
                fs.rmSync(stream.outputDir, { recursive: true, force: true });
            } catch (e) {
                console.error(`Error removing directory for ${slug}:`, e);
            }
            activeStreams.delete(slug);
        }
    }
}, 60 * 1000); // Check every minute

function startHLSStream(udpUrl: string, slug: string): string {
    // Create a unique output directory for this stream
    const outputDir = path.join(os.tmpdir(), 'livehub-streams', slug);
    fs.mkdirSync(outputDir, { recursive: true });

    const playlistPath = path.join(outputDir, 'playlist.m3u8');

    console.log(`Starting FFmpeg stream for ${slug} from ${udpUrl}`);

    const ffmpegProcess = ffmpeg(udpUrl)
        .inputOptions([
            '-timeout', '5000000',
            '-analyzeduration', '3000000',
            '-probesize', '5000000',
        ])
        .outputOptions([
            // 비디오: 빠른 H.264 변환 (브라우저 호환성)
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-profile:v', 'baseline',
            '-level', '3.1',
            '-pix_fmt', 'yuv420p',

            // 오디오: AAC 변환 (브라우저 호환성)
            '-c:a', 'aac',
            '-b:a', '128k',
            '-ar', '48000',
            '-ac', '2',

            // HLS 설정
            '-f', 'hls',
            '-hls_time', '2',
            '-hls_list_size', '10',
            '-hls_flags', 'delete_segments+independent_segments',
            '-hls_segment_type', 'mpegts',
            '-hls_segment_filename', path.join(outputDir, 'segment_%03d.ts'),
            '-start_number', '0',

            // 성능 최적화
            '-threads', '0',
            '-g', '60',
            '-keyint_min', '60',
            '-sc_threshold', '0',
        ])
        .output(playlistPath)
        .on('start', (commandLine) => {
            console.log(`FFmpeg command: ${commandLine}`);
        })
        .on('error', (err, stdout, stderr) => {
            console.error(`FFmpeg error for ${slug}:`, err.message);
            console.error('FFmpeg stderr:', stderr);
            activeStreams.delete(slug);
        })
        .on('end', () => {
            console.log(`FFmpeg stream ended for ${slug}`);
            activeStreams.delete(slug);
        });

    // Start the FFmpeg process
    ffmpegProcess.run();

    // Store the process
    activeStreams.set(slug, {
        process: ffmpegProcess as any,
        outputDir,
        lastAccess: Date.now(),
    });

    return outputDir;
}

export const handleMcastToHlsProxy: RequestHandler = (req, res) => {
    const { udp, slug } = req.query;

    if (!udp || typeof udp !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid udp parameter' });
    }

    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid slug parameter' });
    }

    // Get or create the stream
    let stream = activeStreams.get(slug);

    if (!stream) {
        const outputDir = startHLSStream(udp, slug);
        stream = activeStreams.get(slug);

        if (!stream) {
            return res.status(500).json({ error: 'Failed to start stream' });
        }
    }

    // Update last access time
    stream.lastAccess = Date.now();

    // Return the HLS playlist URL
    const hlsUrl = `/api/hls/${slug}/playlist.m3u8`;
    res.json({ hlsUrl });
};

export const handleHLSPlaylist: RequestHandler = (req, res) => {
    const { slug } = req.params;

    const stream = activeStreams.get(slug);
    if (!stream) {
        return res.status(404).json({ error: 'Stream not found' });
    }

    // Update last access time
    stream.lastAccess = Date.now();

    const playlistPath = path.join(stream.outputDir, 'playlist.m3u8');

    // Wait for playlist file to exist
    const maxWait = 15000; // 15 seconds
    const startTime = Date.now();

    const checkPlaylist = () => {
        if (fs.existsSync(playlistPath)) {
            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.sendFile(playlistPath);
        } else if (Date.now() - startTime < maxWait) {
            setTimeout(checkPlaylist, 200);
        } else {
            res.status(404).json({ error: 'Playlist not ready' });
        }
    };

    checkPlaylist();
};

export const handleHLSSegment: RequestHandler = (req, res) => {
    const { slug, segment } = req.params;

    const stream = activeStreams.get(slug);
    if (!stream) {
        return res.status(404).json({ error: 'Stream not found' });
    }

    // Update last access time
    stream.lastAccess = Date.now();

    const segmentPath = path.join(stream.outputDir, segment);

    if (!fs.existsSync(segmentPath)) {
        return res.status(404).json({ error: 'Segment not found' });
    }

    res.setHeader('Content-Type', 'video/mp2t');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(segmentPath);
};
