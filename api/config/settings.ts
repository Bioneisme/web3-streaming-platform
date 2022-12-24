import dotenv from "dotenv";
import {create} from "ipfs-http-client";
dotenv.config();

// const NODE_ENV: string = process.env.NODE_ENV || 'development';

export const DB_URI: string = process.env.DB_URI || 'postgres://postgres:root@postgres:5432/postgres';
export const SERVER_PORT: number = +(process.env.SERVER_PORT || 5000);
export const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';
export const CLIENT_URL2: string = process.env.CLIENT_URL2 || 'http://localhost:3001';
export const JWT_SECRET: string = process.env.JWT_SECRET || "secretKey123123";
export const INFURA_PROJECT_ID: string = process.env.INFURA_PROJECT_ID as string;
export const INFURA_API_KEY: string = process.env.INFURA_API_KEY as string;
export const BSC_SCAN_API_KEY: string = process.env.BSC_SCAN_API_KEY as string;
export const MNEMONIC: string = process.env.MNEMONIC as string;
export const RPC: string = process.env.RPC || 'https://data-seed-prebsc-1-s1.binance.org:8545';
export const MAIN_ADDRESS: string = process.env.MAIN_ADDRESS as string;
export const STREAM_CONFIG = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*',
        mediaroot: './media'
    }
};

const auth = 'Basic ' + Buffer.from(`${INFURA_PROJECT_ID}:${INFURA_API_KEY}`).toString('base64');

export const IPFS = create({
    host: 'ipfs.infura.io',
    port: 5001, protocol: 'https',
    headers: {
        authorization: auth
    }
    // url: "http://127.0.0.1:5001"
});