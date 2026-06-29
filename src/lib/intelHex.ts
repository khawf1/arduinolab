export function parseIntelHex(hex: string): Uint16Array {
  const lines = hex.split(/\r?\n/).filter((l) => l.startsWith(":"));
  const records: { addr: number; data: number[] }[] = [];
  let baseAddr = 0;
  let maxAddr = 0;

  for (const line of lines) {
    const byteCount = parseInt(line.substr(1, 2), 16);
    const addr = parseInt(line.substr(3, 4), 16);
    const type = parseInt(line.substr(7, 2), 16);

    if (type === 0) {
      const data: number[] = [];
      for (let i = 0; i < byteCount; i++) {
        data.push(parseInt(line.substr(9 + i * 2, 2), 16));
      }
      const fullAddr = baseAddr + addr;
      records.push({ addr: fullAddr, data });
      maxAddr = Math.max(maxAddr, fullAddr + data.length);
    } else if (type === 4) {
      const upper = parseInt(line.substr(9, 4), 16);
      baseAddr = upper << 16;
    } else if (type === 1) {
      break;
    }
  }

  const size = maxAddr % 2 === 0 ? maxAddr : maxAddr + 1;
  const bytes = new Uint8Array(size);
  for (const r of records) {
    for (let i = 0; i < r.data.length; i++) bytes[r.addr + i] = r.data[i];
  }
  return new Uint16Array(bytes.buffer);
}
