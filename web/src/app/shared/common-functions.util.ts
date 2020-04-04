export function getBaseLocation() {
  const paths: string[] = location.pathname.split('/').splice(1, 1);
  const basePath: string = (paths && paths[0]) || '/insightly-sales-ops/demo/dist/';
  return '/' + basePath;
}
