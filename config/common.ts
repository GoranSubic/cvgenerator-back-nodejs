import { fileURLToPath } from 'url';
import { dirname } from 'path';

const commonConfig = (metaUrl) => {
    const filename = fileURLToPath(metaUrl || import.meta.url);

    const config = {
        __filename: filename,
        __dirname: dirname(filename)
    }

    return config;
}

export default commonConfig;
