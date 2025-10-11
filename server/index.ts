import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleMcastToHlsProxy, handleHLSPlaylist, handleHLSSegment } from "./routes/hls-proxy";

export function createServer() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // UDP to HLS proxy
    app.get("/api/mcast-to-hls", handleMcastToHlsProxy);

    // HLS playlist and segments
    app.get("/api/hls/:slug/playlist.m3u8", handleHLSPlaylist);
    app.get("/api/hls/:slug/:segment", handleHLSSegment);

    return app;
}
