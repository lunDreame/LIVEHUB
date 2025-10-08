import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleMulticastProxy, handleHLSPlaylist, handleHLSSegment } from "./routes/proxy";

export function createServer() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Example API routes
    app.get("/api/ping", (_req, res) => {
        const ping = process.env.PING_MESSAGE ?? "ping";
        res.json({ message: ping });
    });

    // UDP to HLS proxy
    app.get("/api/proxy", handleMulticastProxy);

    // HLS playlist and segments
    app.get("/api/hls/:slug/playlist.m3u8", handleHLSPlaylist);
    app.get("/api/hls/:slug/:segment", handleHLSSegment);

    return app;
}
