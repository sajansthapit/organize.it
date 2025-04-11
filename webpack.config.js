import CopyWebpackPlugin from "copy-webpack-plugin";

export const plugins = [
    new CopyWebpackPlugin({
        patterns: [
            {
                from: "app/generated/prisma/libquery_engine-rhel-openssl-1.0.x.so.node",
                to: ".next/", // Adjust this path to your output directory
            },
        ],
    }),
];
