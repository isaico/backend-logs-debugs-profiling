import os from 'os';
import parseArgs from 'minimist';

const numCpus = os.cpus().length;
const args = parseArgs(process.argv.slice(2));
const obj = {
  Argumentos: args,
  SO: process.platform,
  NodeV: process.version,
  Rss: process.memoryUsage(),
  PathEjecucion: process.execPath,
  ProcessId: process.pid,
  CarpetaProyecto: process.cwd(),
  procesadores: numCpus,
};
export const getInfo = async (req, res) => {
  res.status(200).json(obj);
};
export const getInfoCompress = async (req,res) => {
  res.status(200).json(obj);
};
