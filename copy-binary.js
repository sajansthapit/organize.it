const fs = require("fs");
const path = require("path");

const source = path.join(
	__dirname,
	"app/generated/prisma/libquery_engine-rhel-openssl-1.0.x.so.node"
);
const destination = path.join(
	__dirname,
	".next/libquery_engine-rhel-openssl-1.0.x.so.node"
);

fs.copyFileSync(source, destination);
