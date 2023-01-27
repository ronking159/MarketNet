import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import configureServer from './socketServer.js'

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer
}

const config: UserConfig = {
	// @ts-ignore
	plugins: [sveltekit(), webSocketServer]
};

export default config;
