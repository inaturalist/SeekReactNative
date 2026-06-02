const fs = require( "fs" );

// === Load package.json files ===
const seek = JSON.parse( fs.readFileSync( "../package.json", "utf-8" ) );
const inat = JSON.parse( fs.readFileSync( "./package.json", "utf-8" ) );

// === Combine dependencies and devDependencies ===
const mergeDeps = ( pkg ) => ( {
  ...pkg.dependencies,
  ...pkg.devDependencies,
} );

const seekDeps = mergeDeps( seek );
const inatDeps = mergeDeps( inat );

// === Find shared dependencies and compare versions ===
const sharedDeps = Object.keys( seekDeps ).filter( ( dep ) => inatDeps[dep] );

console.log( "\n📦 Shared dependencies between Seek and iNat:\n" );
console.log(
  `  Match ${"Package".padEnd( 35 )}  ${"Seek Version".padEnd( 15 )} iNat Version`
);

sharedDeps.sort().forEach( ( dep ) => {
  const seekVer = seekDeps[dep];
  const inatVer = inatDeps[dep];
  const isMatch = seekVer === inatVer;
  const mark = isMatch ? "✓" : "✗";
  const seekOut = isMatch ? seekVer : seekVer;
  const inatOut = isMatch ? inatVer : inatVer;

  console.log(
    `${" ".repeat( 2 )}${mark}    ${dep.padEnd( 35 )}  ${seekOut.padEnd( 15 )}  ${inatOut}`
  );
} );
