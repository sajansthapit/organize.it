/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals.push({ encoding: "commonjs encoding" });
		}
		return config;
	},
};

export default nextConfig;
