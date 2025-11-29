const normalize = (input: string): string => {
  let s = String(input);
  if (!s) return "";
  const hadTrail = /[\\/]$/.test(s);
  s = s.replace(/\\/g, "/");
  const isUNC = s.startsWith("//");
  const drive = /^[A-Za-z]:/.exec(s)?.[0] ?? "";
  const isDriveAbs = !!drive && s.length > 2 && s[2] === "/";
  const isAbs = isUNC || s.startsWith("/") || isDriveAbs;
  const raw = s.split("/");
  const stack: string[] = [];
  let uncCount = 0;
  for (let i = 0; i < raw.length; i++) {
    const seg = raw[i];
    if (!seg) continue;
    if (drive && i === 0) continue;
    if (isUNC && uncCount < 2) {
      stack.push(seg);
      uncCount++;
      continue;
    }
    if (seg === ".") continue;
    if (seg === "..") {
      const guard = isUNC ? 2 : 0;
      if (stack.length > guard && stack[stack.length - 1] !== "..") {
        stack.pop();
      } else if (!isAbs) {
        stack.push("..");
      }
      continue;
    }
    stack.push(seg);
  }
  const joined = stack.join("/");
  let res = "";
  if (isUNC) res = "//" + joined;
  else if (isDriveAbs) res = drive + "/" + joined;
  else if (drive) res = joined ? drive + "/" + joined : drive;
  else if (s.startsWith("/")) res = "/" + joined;
  else res = joined || ".";
  if (hadTrail && res && res !== "/" && !res.endsWith("/")) res += "/";
  return res;
}
export default normalize;
